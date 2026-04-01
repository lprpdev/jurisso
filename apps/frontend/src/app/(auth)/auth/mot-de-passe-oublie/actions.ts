'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface ForgotPasswordState {
  error?: string;
  success?: boolean;
}

export async function forgotPasswordAction(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Veuillez entrer votre adresse email.' };
  }

  try {
    await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Always show success to avoid email enumeration
    return { success: true };
  } catch {
    return { error: 'Impossible de contacter le serveur. Réessayez.' };
  }
}
