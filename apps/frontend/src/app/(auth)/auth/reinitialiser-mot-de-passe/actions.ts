'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface ResetPasswordState {
  error?: string;
  success?: boolean;
}

export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  if (password.length < 8) {
    return { error: 'Le mot de passe doit contenir au moins 8 caractères.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas.' };
  }

  if (!token) {
    return { error: 'Lien de réinitialisation invalide ou expiré.' };
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return {
        error: body?.message ?? 'Lien de réinitialisation invalide ou expiré.',
      };
    }

    return { success: true };
  } catch {
    return { error: 'Impossible de contacter le serveur. Réessayez.' };
  }
}
