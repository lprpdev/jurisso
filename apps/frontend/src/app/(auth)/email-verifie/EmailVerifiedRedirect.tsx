'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function EmailVerifiedRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/connexion');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}
