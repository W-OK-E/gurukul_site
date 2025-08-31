// scripts/create_user.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin operations
)

interface CreateUserData {
  email: string
  password: string
  fullName: string
  userType: 'student' | 'instructor'
  phone?: string
  // New fields for enrollment
  courseId?: string
  instructorId?: string
  schedule?: ScheduleEntry[]
}

interface ScheduleEntry {
  date: string // YYYY-MM-DD format
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  notes?: string
}

export async function createUserWithEnrollment(userData: CreateUserData) {
  try {
    console.log('Creating user with enrollment...', userData.email)

    // Step 1: Create user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: userData.fullName,
        user_type: userData.userType,
        phone: userData.phone,
      },
    })

    if (authError) {
      throw new Error(`Auth creation failed: ${authError.message}`)
    }

    if (!authData.user) {
      throw new Error('No user data returned from auth creation')
    }

    console.log('Auth user created:', authData.user.id)

    // Step 2: Create user profile in users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email,
        full_name: userData.fullName,
        user_type: userData.userType,
        phone: userData.phone,
      })
      .select()
      .single()

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    console.log('User profile created:', userProfile.id)

    // Step 3: Create enrollment if student and course/instructor provided
    if (userData.userType === 'student' && userData.courseId && userData.instructorId) {
      // Verify course exists
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('id, name')
        .eq('id', userData.courseId)
        .single()

      if (courseError || !course) {
        throw new Error(`Course not found: ${userData.courseId}`)
      }

      // Verify instructor exists and is an instructor
      const { data: instructor, error: instructorError } = await supabase
        .from('users')
        .select('id, full_name, user_type')
        .eq('id', userData.instructorId)
        .eq('user_type', 'instructor')
        .single()

      if (instructorError || !instructor) {
        throw new Error(`Instructor not found: ${userData.instructorId}`)
      }

      // Create enrollment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('student_enrollments')
        .insert({
          student_id: authData.user.id,
          course_id: userData.courseId,
          instructor_id: userData.instructorId,
          status: 'active',
        })
        .select()
        .single()

      if (enrollmentError) {
        throw new Error(`Enrollment creation failed: ${enrollmentError.message}`)
      }

      console.log('Enrollment created:', enrollment.id)

      // Step 4: Create schedule entries if provided
      if (userData.schedule && userData.schedule.length > 0) {
        const scheduleInserts = userData.schedule.map(scheduleEntry => ({
          enrollment_id: enrollment.id,
          class_date: scheduleEntry.date,
          start_time: scheduleEntry.startTime,
          end_time: scheduleEntry.endTime,
          status: 'scheduled' as const,
          notes: scheduleEntry.notes,
        }))

        const { data: schedules, error: scheduleError } = await supabase
          .from('schedules')
          .insert(scheduleInserts)
          .select()

        if (scheduleError) {
          throw new Error(`Schedule creation failed: ${scheduleError.message}`)
        }

        console.log(`Created ${schedules.length} schedule entries`)
      }

      return {
        success: true,
        user: userProfile,
        enrollment,
        course: course.name,
        instructor: instructor.full_name,
        message: `Student created and enrolled in ${course.name} with ${instructor.full_name}`,
      }
    }

    return {
      success: true,
      user: userProfile,
      message: `${userData.userType} created successfully`,
    }
  } catch (error: any) {
    console.error('Error creating user with enrollment:', error.message)
    return {
      success: false,
      message: error.message,
    }
  }
}

// Example usage function
export async function createSampleStudent() {
  // First, get available courses and instructors
  const { data: courses } = await supabase.from('courses').select('id, name').limit(1)
  const { data: instructors } = await supabase
    .from('users')
    .select('id, full_name')
    .eq('user_type', 'instructor')
    .limit(1)

  if (!courses?.length || !instructors?.length) {
    console.log('Need at least one course and one instructor to create sample student')
    return
  }

  const sampleSchedule: ScheduleEntry[] = [
    {
      date: '2024-09-02', // Monday
      startTime: '10:00',
      endTime: '11:00',
      notes: 'Introduction session',
    },
    {
      date: '2024-09-04', // Wednesday
      startTime: '10:00',
      endTime: '11:00',
    },
    {
      date: '2024-09-06', // Friday
      startTime: '10:00',
      endTime: '11:00',
    },
  ]

  const result = await createUserWithEnrollment({
    email: 'student@example.com',
    password: 'password123',
    fullName: 'John Doe',
    userType: 'student',
    phone: '+1234567890',
    courseId: courses[0].id,
    instructorId: instructors[0].id,
    schedule: sampleSchedule,
  })

  console.log('Sample student creation result:', result)
}

// Run this if called directly
if (require.main === module) {
  createSampleStudent()
}