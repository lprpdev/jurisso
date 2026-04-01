'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function toggleFavoriteAction(documentId: string, isFavorite: boolean) {
  try {
    if (isFavorite) {
      // Find the favorite ID first, then delete
      const favorites = await api<{ data: { id: string; documentId: string }[] }>('/api/favorites?limit=999');
      const fav = favorites.data?.find((f) => f.documentId === documentId);
      if (fav) {
        await api(`/api/favorites/${fav.id}`, { method: 'DELETE' });
      }
    } else {
      await api('/api/favorites', {
        method: 'POST',
        body: { documentId },
      });
    }
  } catch {
    // Silently handle (already added/removed)
  }
  revalidatePath(`/document/${documentId}`);
  revalidatePath('/favoris');
}

export async function copyLinkAction(documentId: string) {
  return { url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/document/${documentId}` };
}

export async function exportPdfAction(documentId: string) {
  try {
    const response = await api<{ title: string; content: string }>(`/api/documents/${documentId}/export/pdf`);
    return response;
  } catch {
    return null;
  }
}
