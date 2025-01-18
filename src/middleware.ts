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
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          });
        },
        remove(name: string) {
          response.cookies.delete(name);
        },
      },
    }
  );

  try {
    const pathname = request.nextUrl.pathname;
    console.log('Middleware processing path:', pathname);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    console.log('Auth check result:', { user: user?.email, hasError: !!userError });

    // Handle admin routes
    if (pathname.startsWith('/admin')) {
      console.log('Processing admin route:', pathname);

      // Allow access to login page without auth
      if (pathname === '/admin/login') {
        console.log('Accessing admin login page');
        // If already logged in as admin, redirect to admin dashboard
        if (user && !userError) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          const isAdmin =
            user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
            profile?.role === 'admin' ||
            user.user_metadata?.roles?.includes('admin');

          if (isAdmin) {
            console.log('Admin already logged in, redirecting to dashboard');
            return NextResponse.redirect(new URL('/admin', request.url));
          }
        }
        return response;
      }

      // For all other admin routes, require authentication
      if (!user || userError) {
        console.log('No user, redirecting to admin login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Check admin status
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('Admin check:', {
        email: user.email,
        adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        profileRole: profile?.role,
        metadata: user.user_metadata,
      });

      const isAdmin =
        user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
        profile?.role === 'admin' ||
        user.user_metadata?.roles?.includes('admin');

      console.log('Is admin?', isAdmin);

      // For authenticated users, check admin status for non-login admin routes
      if (!isAdmin) {
        console.log('Non-admin trying to access admin route, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
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
