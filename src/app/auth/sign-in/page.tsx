'use client'

import { AuthContainer } from '@/components/auth/auth-container'

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Sign in to continue to LuxeWin
        </p>
      </div>
      <AuthContainer view="sign_in" />
    </div>
  )
}
