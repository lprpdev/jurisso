'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function deleteAnnotationAction(annotationId: string) {
  await api(`/api/annotations/${annotationId}`, { method: 'DELETE' });
  revalidatePath('/annotations');
}
