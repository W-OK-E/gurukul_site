// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authService } from '@/lib/auth'; // update path accordingly
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log("EMail in the router:",email);
  console.log("Password in the router:",password);
  const result = await authService.signIn({ email, password });
  console.log("Checking if login was a success:",result.success);
  if (!result.success || !result.user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Set the cookie
  const response = NextResponse.json({ success: true, userType: result.user.user_type });

  response.headers.set('Set-Cookie', serialize('userType', result.user.user_type, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  }));

  return response;
}
