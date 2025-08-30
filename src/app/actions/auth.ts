// app/actions/auth.ts
'use server'

import { serverAuthService } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/login?error=Email and password are required')
  }

  const result = await serverAuthService.signIn({ email, password })

  if (!result.success) {
    redirect(`/login?error=${encodeURIComponent(result.message || 'Login failed')}`)
  }

  // Let the middleware handle the redirect based on user type
  // This prevents double redirects
  revalidatePath('/')
  redirect('/login')
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const userType = formData.get('userType') as 'student' | 'instructor'
  const phone = formData.get('phone') as string

  if (!email || !password || !fullName || !userType) {
    throw new Error('All required fields must be filled')
  }

  const result = await serverAuthService.signUp({
    email,
    password,
    fullName,
    userType,
    phone: phone || undefined,
  })

  if (!result.success) {
    throw new Error(result.message || 'Signup failed')
  }

  // Redirect to login or dashboard
  redirect('/login?message=Account created successfully')
}

export async function logoutAction() {
  const result = await serverAuthService.signOut()
  console.log("Results here:",result.success)
  if (!result.success) {
    console.log("Still throwing Error");
    throw new Error(result.message || 'Logout failed')
  }
}