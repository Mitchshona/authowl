import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const { pathname } = request.nextUrl

  // If the user is not logged in and trying to access a protected route
  if (!session && (pathname.startsWith('/settings') || pathname === '/')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // If the user is logged in and trying to access login page
  if (session && pathname === '/signin') {
    return NextResponse.redirect(new URL('/settings', request.url))
  }

  // If the user is logged in and accessing the root route
  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/settings', request.url))
  }

  // For API routes, add the Authorization header
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    if (session) {
      response.headers.set('Authorization', `Bearer ${session.value}`)
    }
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/settings/:path*',
    '/api/:path*',
  ],
}