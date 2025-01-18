'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log('AuthProvider initializing...');
    let mounted = true;

    const getUser = async () => {
      try {
        console.log('Fetching user...');
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError);
          throw userError;
        }
        console.log('Current user:', currentUser?.email);

        if (!mounted) return;
        setUser(currentUser);

        // Check if user is admin based on email and metadata
        if (currentUser) {
          console.log('Checking admin status for:', currentUser.email);
          console.log('Checking admin status for user:', currentUser.email);
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();

          console.log('Profile data:', profile);
          console.log('Admin email check:', {
            userEmail: currentUser.email,
            adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            metadata: currentUser.user_metadata,
          });

          const isUserAdmin =
            currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
            profile?.role === 'admin' ||
            currentUser.user_metadata?.roles?.includes('admin');

          console.log('Admin status check:', {
            emailMatch: currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            profileRole: profile?.role,
            metadataRoles: currentUser.user_metadata?.roles,
            isAdmin: isUserAdmin,
          });

          if (isUserAdmin) {
            console.log('Setting admin role...');
            // Update user metadata if not already set
            if (!currentUser.user_metadata?.roles?.includes('admin')) {
              console.log('Updating user metadata with admin role...');
              const { error: updateError } = await supabase.auth.updateUser({
                data: { roles: ['admin'] },
              });
              if (updateError) {
                console.error('Error updating user metadata:', updateError);
              } else {
                console.log('User metadata updated successfully');
              }
            }
            setIsAdmin(true);
            console.log('Admin status set to true');

            if (window.location.pathname === '/') {
              console.log('Redirecting to admin dashboard...');
              router.push('/admin');
            }
          } else {
            console.log('User is not admin');
            setIsAdmin(false);
            if (window.location.pathname.startsWith('/admin')) {
              console.log('Redirecting non-admin to dashboard...');
              router.push('/dashboard');
            }
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    console.log('Setting up auth state change listener...');
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', { event, session });
      try {
        console.log('Verifying user after auth state change...');
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error getting user:', userError);
          setUser(null);
          setIsAdmin(false);
          return;
        }
        console.log('Current user after auth state change:', currentUser);
        setUser(currentUser);

        if (currentUser) {
          console.log('Checking admin status after auth state change...');
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();

          console.log('Profile data after auth state change:', profile);
          const isUserAdmin =
            currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
            profile?.role === 'admin' ||
            currentUser.user_metadata?.roles?.includes('admin');

          console.log('Is user admin after auth state change?', isUserAdmin);
          if (isUserAdmin) {
            console.log('Updating admin status after auth state change...');
            if (!currentUser.user_metadata?.roles?.includes('admin')) {
              console.log('Updating user metadata with admin role after auth state change...');
              const { error: updateError } = await supabase.auth.updateUser({
                data: { roles: ['admin'] },
              });
              if (updateError) {
                console.error('Error updating user metadata:', updateError);
              }
            }
            setIsAdmin(true);
            console.log('Admin status set to true after auth state change');

            if (window.location.pathname === '/') {
              console.log('Redirecting to admin dashboard after auth state change...');
              router.push('/admin');
            }
          } else {
            console.log('User is not admin after auth state change');
            setIsAdmin(false);
            if (window.location.pathname.startsWith('/admin')) {
              console.log('Redirecting non-admin to dashboard after auth state change...');
              router.push('/dashboard');
            }
          }
        }

        console.log('Refreshing router after auth state change...');
        router.refresh();
      } catch (error) {
        console.error('Error in auth state change handler:', error);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      // Redirect based on current path
      if (window.location.pathname.startsWith('/admin')) {
        router.push('/admin/login');
      } else {
        router.push('/auth/sign-in');
      }
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
