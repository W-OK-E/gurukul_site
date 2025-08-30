import { supabase } from './supabase';
import type { Tables } from './supabase';

// Student-related database operations
export class StudentService {
  // Get student's teacher information
  async getStudentTeacher(studentId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          courses (
            teacher_id,
            teachers (
              id,
              subject,
              experience_years,
              rating,
              bio,
              qualification,
              users (
                full_name,
                email,
                phone,
                avatar_url
              )
            )
          )
        `)
        .eq('student_id', studentId)
        .eq('status', 'active')
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return null;
    }
  }

  // Get student's courses
  async getStudentCourses(studentId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          status,
          progress,
          grade,
          completed_sessions,
          enrollment_date,
          courses (
            id,
            name,
            description,
            total_sessions,
            status
          )
        `)
        .eq('student_id', studentId)
        .order('enrollment_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching student courses:', error);
      return [];
    }
  }

  // Get student's attendance
  async getStudentAttendance(studentId: string, month?: number, year?: number) {
    try {
      let query = supabase
        .from('attendance')
        .select(`
          id,
          session_date,
          status,
          session_topic,
          notes,
          enrollments!inner (
            student_id,
            courses (
              name
            )
          )
        `)
        .eq('enrollments.student_id', studentId);

      // Filter by month/year if provided
      if (month !== undefined && year !== undefined) {
        const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
        const endDate = new Date(year, month, 0).toISOString().split('T')[0];
        query = query.gte('session_date', startDate).lte('session_date', endDate);
      }

      const { data, error } = await query.order('session_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return [];
    }
  }

  // Get attendance statistics
  async getAttendanceStats(studentId: string) {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          status,
          enrollments!inner (
            student_id
          )
        `)
        .eq('enrollments.student_id', studentId);

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        present: data?.filter(a => a.status === 'present').length || 0,
        absent: data?.filter(a => a.status === 'absent').length || 0,
        scheduled: data?.filter(a => a.status === 'scheduled').length || 0,
      };

      const attendanceRate = stats.total > 0 
        ? Math.round((stats.present / (stats.present + stats.absent)) * 100) 
        : 0;

      return { ...stats, attendanceRate };
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      return { total: 0, present: 0, absent: 0, scheduled: 0, attendanceRate: 0 };
    }
  }
}

// Teacher-related database operations
export class TeacherService {
  // Get teacher's students
  async getTeacherStudents(teacherId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          status,
          progress,
          grade,
          completed_sessions,
          enrollment_date,
          users (
            id,
            full_name,
            email,
            phone,
            avatar_url
          ),
          courses (
            id,
            name
          )
        `)
        .eq('courses.teacher_id', teacherId)
        .eq('status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching teacher students:', error);
      return [];
    }
  }

  // Get teacher's courses
  async getTeacherCourses(teacherId: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          name,
          description,
          total_sessions,
          duration_weeks,
          status,
          created_at,
          enrollments (
            id,
            student_id,
            status,
            users (
              full_name
            )
          )
        `)
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
      return [];
    }
  }

  // Update teacher profile
  async updateTeacherProfile(teacherId: string, updates: Partial<Tables<'teachers'>>) {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .update(updates)
        .eq('id', teacherId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating teacher profile:', error);
      return { success: false, error };
    }
  }

  // Mark attendance for a student
  async markAttendance(
    enrollmentId: string, 
    sessionDate: string, 
    status: 'present' | 'absent' | 'scheduled',
    sessionTopic?: string,
    notes?: string
  ) {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .upsert({
          enrollment_id: enrollmentId,
          session_date: sessionDate,
          status,
          session_topic: sessionTopic,
          notes,
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error marking attendance:', error);
      return { success: false, error };
    }
  }
}

// General database operations
export class GeneralService {
  // Get user profile with related data
  async getUserProfile(userId: string) {
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      // If user is a teacher, get teacher data
      if (user.user_type === 'instructor') {
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .select('*')
          .eq('id', userId)
          .single();

        if (teacherError) throw teacherError;
        return { ...user, teacherData };
      }

      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<Tables<'users'>>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error };
    }
  }
}

// Export service instances
export const studentService = new StudentService();
export const teacherService = new TeacherService();
export const generalService = new GeneralService();