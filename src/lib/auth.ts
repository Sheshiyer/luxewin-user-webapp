import { redirect } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export async function requireAuth() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  return session;
}
