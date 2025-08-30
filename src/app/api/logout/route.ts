import { NextRequest, NextResponse } from 'next/server';
import { logoutAction } from '@/app/actions/auth';

export async function POST(request: NextRequest) {
  try {
    await logoutAction();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error in apt/logout:");
    console.log(error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}