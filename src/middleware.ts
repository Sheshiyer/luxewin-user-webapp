import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  try {
    const pathname = request.nextUrl.pathname;
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Handle admin routes
    if (pathname.startsWith('/admin')) {
      // Allow access to login page without auth
      if (pathname === '/admin/login') {
        // If already logged in as admin, redirect to admin dashboard
        if (user?.email === 'mrhigh3r@gmail.com') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
      }

      // For non-login admin routes
      if (!user || userError) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Allow access only for admin email
      if (user.email === 'mrhigh3r@gmail.com') {
        return response;
      }

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
        const redirectUrl = new URL(redirectTo, request.url);
        // Ensure the redirect URL is absolute
        if (!redirectUrl.origin) {
          redirectUrl.protocol = request.nextUrl.protocol;
          redirectUrl.host = request.nextUrl.host;
        }
        return NextResponse.redirect(redirectUrl);
      }
    }

    return response;
  } catch {
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
