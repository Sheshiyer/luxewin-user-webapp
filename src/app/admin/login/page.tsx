'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    console.log('Admin login page mounted:', { user, isAdmin });
  }, [user, isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Login attempt:', {
        email,
        adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        currentUser: user,
        isCurrentlyAdmin: isAdmin,
      });

      // Check admin credentials against environment variables
      if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        console.log('Email matches admin email, attempting sign in');

        // Attempt sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          console.error('Sign in error:', signInError);
          throw signInError;
        }
        console.log('Sign in successful:', signInData?.user?.email);

        // Wait a moment for auth state to update
        await new Promise(resolve => setTimeout(resolve, 500));

        // Verify user with getUser for security
        const {
          data: { user: verifiedUser },
          error: verifyError,
        } = await supabase.auth.getUser();
        if (verifyError) {
          console.error('Verify error:', verifyError);
          throw verifyError;
        }
        console.log('User verified:', {
          id: verifiedUser?.id,
          email: verifiedUser?.email,
          metadata: verifiedUser?.user_metadata,
        });

        if (verifiedUser) {
          console.log('Starting admin role setup');
          try {
            // Update user metadata with admin role
            console.log('Updating user metadata with admin role...');
            const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
              data: { roles: ['admin'] },
            });
            if (updateError) {
              console.error('Update user error:', updateError);
              throw updateError;
            }
            console.log('User metadata updated:', updatedUser?.user?.user_metadata);

            // Check if profile exists
            console.log('Checking for existing profile...');
            const { data: existingProfile, error: profileCheckError } = await supabase
              .from('profiles')
              .select('id, role')
              .eq('id', verifiedUser.id)
              .single();

            if (profileCheckError && profileCheckError.code !== 'PGRST116') {
              console.error('Profile check error:', profileCheckError);
              throw profileCheckError;
            }
            console.log('Profile check result:', existingProfile);

            // Update or insert admin role in profiles table
            console.log('Updating profile with admin role...');
            const { data: updatedProfile, error: profileError } = await supabase
              .from('profiles')
              .upsert(
                {
                  id: verifiedUser.id,
                  role: 'admin',
                  updated_at: new Date().toISOString(),
                  // Include created_at only for new profiles
                  ...(existingProfile ? {} : { created_at: new Date().toISOString() }),
                },
                {
                  onConflict: 'id',
                  ignoreDuplicates: false,
                }
              );
            if (profileError) {
              console.error('Profile update error:', profileError);
              throw profileError;
            }
            console.log('Profile updated:', updatedProfile);

            console.log('Admin setup complete, redirecting to dashboard');
            await router.push('/admin');
          } catch (error) {
            // If role update fails, sign out and show error
            console.error('Admin role setup failed:', error);
            await supabase.auth.signOut();
            throw error;
          }
        }
      } else {
        console.log('Email does not match admin email:', {
          provided: email,
          expected: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        });
        setError('Invalid admin credentials');
        await supabase.auth.signOut();
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message || 'An error occurred during login';
        console.error('Login error:', { error, message: errorMessage });
        setError(errorMessage);
      } else {
        console.error('Unknown error type:', error);
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
