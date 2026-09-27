import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Anti-hacking: Protect sensitive routes
  // Without a database, we block these routes from public access.
  const protectedPaths = ['/dashboard', '/admin'];
  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    // We check for a secret cookie (in case the admin implements a simple password page later)
    // If the cookie isn't present or doesn't match the environment secret, block them.
    const adminToken = request.cookies.get('admin_token');
    const secret = process.env.ADMIN_SECRET;
    
    if (!secret || adminToken?.value !== secret) {
      // Redirect hackers or unauthorized users back to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
