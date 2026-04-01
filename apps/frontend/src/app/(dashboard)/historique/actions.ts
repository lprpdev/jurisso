'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function clearAllHistoryAction() {
  await api('/search/history', { method: 'DELETE' });
  revalidatePath('/historique');
}

export async function deleteHistoryItemAction(itemId: string) {
  await api(`/search/history/${itemId}`, { method: 'DELETE' });
  revalidatePath('/historique');
}
