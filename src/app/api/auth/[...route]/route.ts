import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/supabase';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const response = new NextResponse();
  const pathname = request.nextUrl.pathname;
  const route = pathname.split('/').pop() || '';

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: request.cookies as unknown as CookieMethodsServer,
    }
  );

  try {
    let result;
    switch (route) {
      case 'session':
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        result = { session };
        break;

      case 'user':
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        result = { user };
        break;

      default:
        return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    const responseHeaders = new Headers(response.headers);
    return NextResponse.json(result, { headers: responseHeaders });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
