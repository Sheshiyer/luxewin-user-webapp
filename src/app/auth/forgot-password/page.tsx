'use client'

import { AuthContainer } from '@/components/auth/auth-container'

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enter your email address to receive a password reset link
        </p>
      </div>
      <AuthContainer view="forgotten_password" />
    </div>
  )
}
