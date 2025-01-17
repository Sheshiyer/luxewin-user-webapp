'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createBrowserSupabaseClient } from '@/lib/supabase'

interface AuthContainerProps {
  view?: 'sign_in' | 'sign_up' | 'forgotten_password'
  redirectTo?: string
}

export function AuthContainer({
  view = 'sign_in',
  redirectTo = '/',
}: AuthContainerProps) {
  const supabase = createBrowserSupabaseClient()

  return (
    <div className="max-w-md w-full mx-auto p-6 card">
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
              },
            },
          },
          className: {
            container: 'space-y-4',
            button: 'button-primary w-full',
            input: 'input-field',
            label: 'form-label',
          },
        }}
        providers={['google', 'github']}
        redirectTo={redirectTo}
      />
    </div>
  )
}
