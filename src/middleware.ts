import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const tenantId = request.cookies.get('tenant_id')?.value;
    const { pathname } = request.nextUrl;

    // 1. If trying to access protected routes (dashboard)
    if (pathname.startsWith('/dashboard') || pathname === '/') {
        if (!tenantId) {
            // Redirect to login if no tenant cookie
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // 2. Set the x-tenant-id header for Server Components
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-tenant-id', tenantId);

        // 3. Rewrite the URL (internal) allows preserving the header
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    // Allow access to public routes (login, api, etc.)
    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (public login page)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};
