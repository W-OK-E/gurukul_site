import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          user_type: 'student' | 'instructor';
          phone?: string;
          join_date: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          user_type: 'student' | 'instructor';
          phone?: string;
          avatar_url?: string;
        };
        Update: {
          full_name?: string;
          phone?: string;
          avatar_url?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          subject: string;
          experience_years: number;
          rating: number;
          bio?: string;
          qualification?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          subject: string;
          experience_years?: number;
          rating?: number;
          bio?: string;
          qualification?: string;
        };
        Update: {
          subject?: string;
          experience_years?: number;
          rating?: number;
          bio?: string;
          qualification?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          name: string;
          description?: string;
          teacher_id: string;
          total_sessions: number;
          duration_weeks: number;
          status: 'active' | 'completed' | 'paused';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string;
          teacher_id: string;
          total_sessions?: number;
          duration_weeks?: number;
          status?: 'active' | 'completed' | 'paused';
        };
        Update: {
          name?: string;
          description?: string;
          total_sessions?: number;
          duration_weeks?: number;
          status?: 'active' | 'completed' | 'paused';
        };
      };
      enrollments: {
        Row: {
          id: string;
          student_id: string;
          course_id: string;
          enrollment_date: string;
          status: 'active' | 'completed' | 'dropped';
          progress: number;
          grade?: string;
          completed_sessions: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          student_id: string;
          course_id: string;
          status?: 'active' | 'completed' | 'dropped';
          progress?: number;
          grade?: string;
          completed_sessions?: number;
        };
        Update: {
          status?: 'active' | 'completed' | 'dropped';
          progress?: number;
          grade?: string;
          completed_sessions?: number;
        };
      };
      attendance: {
        Row: {
          id: string;
          enrollment_id: string;
          session_date: string;
          status: 'present' | 'absent' | 'holiday' | 'scheduled';
          session_topic?: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          enrollment_id: string;
          session_date: string;
          status: 'present' | 'absent' | 'holiday' | 'scheduled';
          session_topic?: string;
          notes?: string;
        };
        Update: {
          status?: 'present' | 'absent' | 'holiday' | 'scheduled';
          session_topic?: string;
          notes?: string;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];