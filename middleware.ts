import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/rewards', '/settings', '/games'];
  const isProtectedRoute = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // When we have real auth, we'll check for a valid session here
  // For now, we'll let the client-side handle the protection
  return NextResponse.next();
}

export const config = {
  matcher: ['/rewards/:path*', '/settings/:path*', '/games/:path*'],
}; 