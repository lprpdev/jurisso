'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function exportRGPDAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await api('/users/me/export', { method: 'POST' });
    return { success: true };
  } catch {
    return { success: false, error: 'Impossible de lancer l\u2019export.' };
  }
}

export async function revokeSessionAction(sessionId: string) {
  await api(`/users/me/sessions/${sessionId}`, { method: 'DELETE' });
  revalidatePath('/parametres');
}

export async function revokeAllSessionsAction() {
  await api('/users/me/sessions', { method: 'DELETE' });
  revalidatePath('/parametres');
}
