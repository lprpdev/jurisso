'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: 'Email ou mot de passe incorrect.' };
    }

    const data = await response.json();

    // Handle 2FA requirement
    if (data.requires2FA) {
      const cookieStore = await cookies();
      cookieStore.set('2fa_temp_token', data.tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 300, // 5 minutes
      });
      redirect('/2fa');
    }

    // Set the JWT access token in an httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });
  } catch (error) {
    // Re-throw redirect errors (Next.js uses thrown errors for redirects)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    return { error: 'Email ou mot de passe incorrect.' };
  }

  redirect('/dashboard');
}
