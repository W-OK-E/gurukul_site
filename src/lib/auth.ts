// lib/auth-server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from './supabase'

// Note: This file should ONLY be imported in Server Components, Server Actions, or Middleware
// DO NOT import this in Client Components

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  userType: 'student' | 'instructor';
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Database['public']['Tables']['users']['Row'];
  message?: string;
}

// Create server-side Supabase client for reading cookies only (Server Components)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Don't set cookies in Server Components - this will be handled by middleware
        },
        remove(name: string, options: any) {
          // Don't remove cookies in Server Components - this will be handled by Server Actions
        },
      },
    }
  )
}

// Create server-side Supabase client for Server Actions (can modify cookies)
export async function createServerActionSupabaseClient() {
  const cookieStore = await cookies()
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}

class ServerAuthService {
  // Use read-only client for Server Components
  private getSupabaseClient() {
    return createServerSupabaseClient()
  }

  // Use action client for Server Actions (can modify cookies)
  private getActionSupabaseClient() {
    return createServerActionSupabaseClient()
  }

  // Sign in with email and password (Server Action)
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const supabase = await this.getActionSupabaseClient() // Use action client for login
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) {
        console.log("Auth error:", authError.message)
        return {
          success: false,
          message: authError.message,
        }
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'No user data received',
        }
      }

      // Fetch user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) {
        return {
          success: false,
          message: 'Failed to fetch user profile',
        }
      }

      console.log("Login successful")
      return {
        success: true,
        user: userProfile,
      }
    } catch (error: any) {
      console.log("Unexpected error:", error.message)
      return {
        success: false,
        message: 'An unexpected error occurred',
      }
    }
  }

  // Sign up new user (Server Action)
  async signUp(signupData: SignupData): Promise<AuthResponse> {
    try {
      const supabase = await this.getActionSupabaseClient() // Use action client for signup
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            user_type: signupData.userType,
            phone: signupData.phone,
          },
        },
      })

      if (authError) {
        return {
          success: false,
          message: authError.message,
        }
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Failed to create user account',
        }
      }

      // Create user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: signupData.email,
          full_name: signupData.fullName,
          user_type: signupData.userType,
          phone: signupData.phone,
        })
        .select()
        .single()

      if (profileError) {
        // Clean up auth user if profile creation fails
        await supabase.auth.signOut()
        return {
          success: false,
          message: 'Failed to create user profile',
        }
      }

      return {
        success: true,
        user: userProfile,
      }
    } catch (error: any) {
      return {
        success: false,
        message: 'An unexpected error occurred during signup',
      }
    }
  }

  // Sign out (Server Action)
  async signOut(): Promise<{ success: boolean; message?: string }> {
    try {
      console.log("Trynna SIgnout:");
      const supabase = await this.getActionSupabaseClient() // Use action client for signout
      const { error } = await supabase.auth.signOut()
      console.log("Error during Signout:",error);
      if (error) {
        return {
          success: false,
          message: error.message,
        }
      }
      return {
        success: true,
      }
    } catch (error: any) {
      console.log("Error during Logout:",error);
      return {
        success: false,
        message: 'An unexpected error occurred during signout',
      }
    }
  }

  // Get current user (Server Component - read-only)
  async getCurrentUser(): Promise<Database['public']['Tables']['users']['Row'] | null> {
    try {
      const supabase = await this.getSupabaseClient() // Use read-only client
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        return null
      }

      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        return null
      }

      return userProfile
    } catch (error) {
      return null
    }
  }

  // Check if user is authenticated (Server Component - read-only)
  async isAuthenticated(): Promise<boolean> {
    try {
      const supabase = await this.getSupabaseClient() // Use read-only client
      const { data: { user } } = await supabase.auth.getUser()
      return !!user
    } catch (error) {
      return false
    }
  }

  // Require authentication (throws redirect if not authenticated)
  async requireAuth(): Promise<Database['public']['Tables']['users']['Row']> {
    const user = await this.getCurrentUser()
    if (!user) {
      redirect('/login')
    }
    return user
  }

  // Require specific user type
  async requireUserType(allowedTypes: string[]): Promise<Database['public']['Tables']['users']['Row']> {
    const user = await this.requireAuth()
    
    if (!allowedTypes.includes(user.user_type)) {
      redirect('/unauthorized')
    }
    
    return user
  }
}

export const serverAuthService = new ServerAuthService()

// Helper functions for common auth checks
export async function getCurrentUser() {
  return serverAuthService.getCurrentUser()
}

export async function requireAuth() {
  return serverAuthService.requireAuth()
}

export async function requireStudent() {
  return serverAuthService.requireUserType(['student'])
}

export async function requireInstructor() {
  return serverAuthService.requireUserType(['instructor'])
}