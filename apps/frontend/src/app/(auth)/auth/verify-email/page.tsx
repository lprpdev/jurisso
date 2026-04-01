import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    redirect('/auth/connexion');
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/verify-email?token=${token}`);

    if (res.ok) {
      redirect('/auth/email-verifie');
    }
  } catch {
    // fall through
  }

  redirect('/auth/connexion?error=invalid-token');
}
