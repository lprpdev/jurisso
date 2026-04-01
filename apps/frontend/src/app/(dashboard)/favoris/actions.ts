'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function removeFavoriteAction(favoriteId: string) {
  await api(`/api/favorites/${favoriteId}`, { method: 'DELETE' });
  revalidatePath('/favoris');
}
