'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => {},
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const checkAdminStatus = useCallback(async (currentUser: User) => {
    try {
      console.log('Checking admin status for:', currentUser.email);
      const isUserAdmin = currentUser.email === 'mrhigh3r@gmail.com';
      setIsAdmin(isUserAdmin);
      return isUserAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  }, []);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError(error as Error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', { event, session });
      if (!mounted) return;

      try {
        if (session?.user) {
          setUser(session.user);
          const isUserAdmin = await checkAdminStatus(session.user);

          // Handle redirects
          if (isUserAdmin && window.location.pathname === '/') {
            router.push('/admin');
          } else if (!isUserAdmin && window.location.pathname.startsWith('/admin')) {
            router.push('/dashboard');
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }

        router.refresh();
      } catch (error) {
        console.error('Error in auth state change handler:', error);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router, checkAdminStatus]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);

      const redirectPath = window.location.pathname.startsWith('/admin')
        ? '/admin/login'
        : '/auth/sign-in';
      router.push(redirectPath);
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error as Error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
