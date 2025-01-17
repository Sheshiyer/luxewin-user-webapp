'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';

interface AuthContainerProps {
  view?: 'sign_in' | 'sign_up' | 'forgotten_password';
}

export function AuthContainer({ view = 'sign_in' }: AuthContainerProps) {
  const getRedirectUrl = () => {
    if (typeof window === 'undefined') return '/dashboard';

    const redirectPath =
      new URLSearchParams(window.location.search).get('redirectTo') || '/dashboard';
    return `${window.location.origin}${redirectPath}`;
  };

  const redirectTo = getRedirectUrl();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'var(--primary-color)',
                brandAccent: 'var(--secondary-color)',
                brandButtonText: 'white',
                inputBackground: 'white',
                inputText: 'black',
                inputPlaceholder: 'gray',
              },
            },
            dark: {
              colors: {
                brand: 'var(--primary-color)',
                brandAccent: 'var(--secondary-color)',
                brandButtonText: 'white',
                inputBackground: 'rgb(31, 41, 55)',
                inputBorder: 'rgb(55, 65, 81)',
                inputText: 'white',
                inputPlaceholder: 'rgb(156, 163, 175)',
                dividerBackground: 'rgb(75, 85, 99)',
              },
            },
          },
          className: {
            container: 'space-y-4',
            button: 'button-primary w-full',
            input: 'input-field',
            label: 'form-label',
            divider:
              'before:bg-gray-300 after:bg-gray-300 dark:before:bg-gray-600 dark:after:bg-gray-600',
          },
          style: {
            button: {
              borderRadius: '0.5rem',
              padding: '0.625rem 1rem',
            },
            input: {
              borderRadius: '0.5rem',
            },
          },
        }}
        providers={['google', 'github']}
        redirectTo={redirectTo}
      />
    </div>
  );
}
