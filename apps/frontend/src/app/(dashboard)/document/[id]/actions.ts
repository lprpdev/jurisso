'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function toggleFavoriteAction(documentId: string, isFavorite: boolean) {
  if (isFavorite) {
    await api(`/favorites/${documentId}`, { method: 'DELETE' });
  } else {
    await api('/favorites', {
      method: 'POST',
      body: { documentId },
    });
  }
  revalidatePath(`/document/${documentId}`);
  revalidatePath('/favoris');
}

export async function copyLinkAction(documentId: string) {
  // This is handled client-side, but we provide a no-op server action
  return { url: `${process.env.NEXT_PUBLIC_APP_URL}/document/${documentId}` };
}

export async function exportPdfAction(documentId: string) {
  const response = await api<{ url: string }>(`/documents/${documentId}/export-pdf`, {
    method: 'POST',
  });
  return response;
}
