'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

// Create a single supabase client for the browser
export const createBrowserSupabaseClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Browser client instance
export const supabase = createBrowserSupabaseClient();

// Helper to get authenticated user from server component
export const getUser = async () => {
  try {
    const response = await fetch('/api/auth/user', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Helper to get session from server component
export const getSession = async () => {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch session');
    const data = await response.json();
    return data.session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
