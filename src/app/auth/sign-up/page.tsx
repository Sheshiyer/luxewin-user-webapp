'use client'

import { AuthContainer } from '@/components/auth/auth-container'

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Join LuxeWin and start participating in premium raffles
        </p>
      </div>
      <AuthContainer view="sign_up" />
    </div>
  )
}
