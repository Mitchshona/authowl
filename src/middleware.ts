import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const { pathname } = request.nextUrl

  console.log('Middleware executed for path:', pathname)
  console.log('Session:', session ? 'exists' : 'does not exist')

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

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/settings/:path*',
  ],
}