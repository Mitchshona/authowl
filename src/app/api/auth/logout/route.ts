import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Remove the session cookie
  (await cookies()).delete('session')

  return NextResponse.json({ success: true })
}