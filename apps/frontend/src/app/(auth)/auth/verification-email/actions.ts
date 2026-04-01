'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function resendVerificationEmail(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const response = await fetch(
      `${API_URL}/api/auth/resend-verification`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!response.ok) {
      return { success: false, error: 'Impossible de renvoyer l\u2019email.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Erreur de connexion au serveur.' };
  }
}
