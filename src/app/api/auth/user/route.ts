import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AuthError } from '@supabase/supabase-js';

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieStore as unknown as CookieMethodsServer,
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting user:', error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Simplified admin check to match middleware
    const isAdmin = user.email === 'mrhigh3r@gmail.com';

    return NextResponse.json({
      user: {
        ...user,
        isAdmin,
      },
    });
  } catch (error) {
    const authError = error as AuthError;
    console.error('Server error:', authError);
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }
}
