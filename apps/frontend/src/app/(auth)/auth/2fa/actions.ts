'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface TwoFactorState {
  error?: string;
}

export async function verify2FAAction(
  _prev: TwoFactorState,
  formData: FormData,
): Promise<TwoFactorState> {
  const code = formData.get('code') as string;

  if (!code || code.length !== 6) {
    return { error: 'Veuillez entrer un code à 6 chiffres.' };
  }

  const cookieStore = await cookies();
  const tempToken = cookieStore.get('2fa_temp_token')?.value;

  if (!tempToken) {
    return { error: 'Session expirée. Veuillez vous reconnecter.' };
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/2fa/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tempToken}`,
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? 'Code invalide. Réessayez.' };
    }

    const data = await response.json();

    // Clear the temp token and set the real access token
    cookieStore.delete('2fa_temp_token');
    cookieStore.set('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });
  } catch {
    return { error: 'Impossible de vérifier le code. Réessayez.' };
  }

  redirect('/dashboard');
}
