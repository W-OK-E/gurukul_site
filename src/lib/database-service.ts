// lib/database-service.ts
import { createServerSupabaseClient } from './auth'
import type { Database } from './supabase'

// Types for better type safety
export interface StudentEnrollmentDetails {
  id: string
  course: {
    id: string
    name: string
    description: string | null
  }
  instructor: {
    id: string
    full_name: string
    email: string
  }
  status: string
  enrolled_at: string
}

export interface ScheduleEntry {
  id: string
  class_date: string
  start_time: string
  end_time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  notes: string | null
}

export interface StudentDashboardData {
  enrollments: StudentEnrollmentDetails[]
  schedules: ScheduleEntry[]
}

class DatabaseService {
  private getClient() {
    return createServerSupabaseClient()
  }

  /**
   * Get student's enrollment details (courses and instructors)
   */
  async getStudentEnrollments(studentId: string): Promise<StudentEnrollmentDetails[]> {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase
        .from('student_enrollments')
        .select(`
          id,
          status,
          enrolled_at,
          course:courses (
            id,
            name,
            description
          ),
          instructor:users!student_enrollments_instructor_id_fkey (
            id,
            full_name,
            email
          )
        `)
        .eq('student_id', studentId)
        .eq('status', 'active')

      if (error) {
        console.error('Error fetching student enrollments:', error)
        return []
      }

      return data.map(enrollment => ({
        id: enrollment.id,
        course: {
          id: enrollment.course.id,
          name: enrollment.course.name,
          description: enrollment.course.description,
        },
        instructor: {
          id: enrollment.instructor.id,
          full_name: enrollment.instructor.full_name,
          email: enrollment.instructor.email,
        },
        status: enrollment.status,
        enrolled_at: enrollment.enrolled_at,
      }))
    } catch (error) {
      console.error('Unexpected error fetching enrollments:', error)
      return []
    }
  }

  /**
   * Get student's schedule/calendar data
   */
  async getStudentSchedules(studentId: string): Promise<ScheduleEntry[]> {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase
        .from('schedules')
        .select(`
          id,
          class_date,
          start_time,
          end_time,
          status,
          notes,
          enrollment:student_enrollments (
            student_id
          )
        `)
        .eq('enrollment.student_id', studentId)
        .order('class_date', { ascending: true })

      if (error) {
        console.error('Error fetching student schedules:', error)
        return []
      }

      return data.map(schedule => ({
        id: schedule.id,
        class_date: schedule.class_date,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        status: schedule.status as ScheduleEntry['status'],
        notes: schedule.notes,
      }))
    } catch (error) {
      console.error('Unexpected error fetching schedules:', error)
      return []
    }
  }

  /**
   * Get complete student dashboard data
   */
  async getStudentDashboardData(studentId: string): Promise<StudentDashboardData> {
    const [enrollments, schedules] = await Promise.all([
      this.getStudentEnrollments(studentId),
      this.getStudentSchedules(studentId),
    ])

    return {
      enrollments,
      schedules,
    }
  }

  /**
   * Get instructor details by ID
   */
  async getInstructorDetails(instructorId: string) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, phone')
        .eq('id', instructorId)
        .eq('user_type', 'instructor')
        .single()

      if (error) {
        console.error('Error fetching instructor details:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error fetching instructor:', error)
      return null
    }
  }

  /**
   * Get course details by ID
   */
  async getCourseDetails(courseId: string) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase
        .from('courses')
        .select('id, name, description')
        .eq('id', courseId)
        .single()

      if (error) {
        console.error('Error fetching course details:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error fetching course:', error)
      return null
    }
  }

  /**
   * Get instructor's students and their courses
   */
  async getInstructorStudents(instructorId: string) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase
        .from('student_enrollments')
        .select(`
          id,
          status,
          enrolled_at,
          student:users!student_enrollments_student_id_fkey (
            id,
            full_name,
            email,
            phone
          ),
          course:courses (
            id,
            name,
            description
          )
        `)
        .eq('instructor_id', instructorId)
        .eq('status', 'active')

      if (error) {
        console.error('Error fetching instructor students:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Unexpected error fetching instructor students:', error)
      return []
    }
  }

  /**
   * Update schedule status (for marking classes as completed)
   */
  async updateScheduleStatus(scheduleId: string, status: ScheduleEntry['status'], notes?: string) {
    try {
      const supabase = this.getClient()

      const updateData: any = { status }
      if (notes !== undefined) {
        updateData.notes = notes
      }

      const { error } = await supabase
        .from('schedules')
        .update(updateData)
        .eq('id', scheduleId)

      if (error) {
        console.error('Error updating schedule status:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Unexpected error updating schedule:', error)
      return false
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()

// Helper functions for easy importing
export async function getStudentDashboardData(studentId: string) {
  return databaseService.getStudentDashboardData(studentId)
}

export async function getStudentEnrollments(studentId: string) {
  return databaseService.getStudentEnrollments(studentId)
}

export async function getStudentSchedules(studentId: string) {
  return databaseService.getStudentSchedules(studentId)
}

export async function getInstructorStudents(instructorId: string) {
  return databaseService.getInstructorStudents(instructorId)
}