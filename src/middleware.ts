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
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
      if (!session) {
        const redirectUrl = new URL('/auth/sign-in', request.url);
        redirectUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Handle auth pages
    if (pathname.startsWith('/auth/')) {
      if (session) {
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
    // Match all routes except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
