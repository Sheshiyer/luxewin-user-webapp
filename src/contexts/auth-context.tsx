'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

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

  const checkAdminStatus = useCallback(async (currentUser: User) => {
    try {
      const isUserAdmin = currentUser.email === 'mrhigh3r@gmail.com';
      setIsAdmin(isUserAdmin);
      return isUserAdmin;
    } catch {
      setIsAdmin(false);
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user);

          // Handle initial redirects
          const currentPath = window.location.pathname;
          const isUserAdmin = session.user.email === 'mrhigh3r@gmail.com';

          if (isUserAdmin && currentPath === '/') {
            router.push('/admin');
          } else if (!isUserAdmin && currentPath.startsWith('/admin')) {
            router.push('/dashboard');
          } else if (currentPath.startsWith('/auth/') && session.user) {
            const searchParams = new URLSearchParams(window.location.search);
            const redirectTo = searchParams.get('redirectTo') || '/dashboard';
            router.push(redirectTo);
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Wait for window to be available before initializing
    if (typeof window !== 'undefined') {
      initializeAuth();
    }

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
      } catch (err) {
        setError(err as Error);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, checkAdminStatus]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);

      const redirectPath = window.location.pathname.startsWith('/admin')
        ? '/admin/login'
        : '/auth/sign-in';
      router.push(redirectPath);
    } catch (err) {
      setError(err as Error);
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
