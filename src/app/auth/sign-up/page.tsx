'use client';

import { AuthContainer } from '@/components/auth/auth-container';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContainer view="sign_up" />
    </Suspense>
  );
}
