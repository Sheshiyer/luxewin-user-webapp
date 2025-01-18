import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: request.cookies as unknown as CookieMethodsServer,
    }
  );

  try {
    const pathname = request.nextUrl.pathname;
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log('Middleware check:', {
      pathname,
      userEmail: user?.email,
      hasError: !!userError,
    });

    // Handle admin routes
    if (pathname.startsWith('/admin')) {
      console.log('Admin route check:', {
        isLoginPage: pathname === '/admin/login',
        isAdminEmail: user?.email === 'mrhigh3r@gmail.com',
      });

      // Allow access to login page without auth
      if (pathname === '/admin/login') {
        // If already logged in as admin, redirect to admin dashboard
        if (user?.email === 'mrhigh3r@gmail.com') {
          console.log('Admin already logged in, redirecting to dashboard');
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
      }

      // For non-login admin routes
      if (!user || userError) {
        console.log('No user or error, redirecting to login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      console.log('User exists, checking admin status');

      // Allow access only for admin email
      if (user.email === 'mrhigh3r@gmail.com') {
        console.log('Admin access granted');
        return response;
      }

      console.log('Non-admin user, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
      if (!user || userError) {
        const redirectUrl = new URL('/auth/sign-in', request.url);
        redirectUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Handle regular auth pages
    if (pathname.startsWith('/auth/')) {
      if (user && !userError) {
        const redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    }

    return response;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/admin/:path*', // Match all admin routes including login
  ],
};
