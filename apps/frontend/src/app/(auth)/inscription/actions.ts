'use server';

import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface RegisterState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const profession = formData.get('profession') as string;
  const barNumber = formData.get('barNumber') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const cgu = formData.get('cgu');
  const newsletter = formData.get('newsletter') === 'on';

  // Client-side validation
  if (!firstName || !lastName || !email || !profession || !password) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  if (password !== confirmPassword) {
    return {
      fieldErrors: {
        confirmPassword: 'Les mots de passe ne correspondent pas.',
      },
    };
  }

  if (password.length < 8) {
    return {
      fieldErrors: {
        password: 'Le mot de passe doit contenir au moins 8 caractères.',
      },
    };
  }

  if (!cgu) {
    return { error: 'Vous devez accepter les CGU pour continuer.' };
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        profession,
        barNumber: profession === 'avocat' ? barNumber : undefined,
        password,
        newsletter,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return {
        error:
          body?.message ??
          'Une erreur est survenue lors de la création du compte.',
      };
    }
  } catch {
    return { error: 'Impossible de contacter le serveur. Réessayez.' };
  }

  redirect('/verification-email');
}
