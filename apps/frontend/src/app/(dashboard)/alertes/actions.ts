'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';

export async function toggleAlertAction(alertId: string, active: boolean) {
  await api(`/api/alerts/${alertId}`, {
    method: 'PATCH',
    body: { active },
  });
  revalidatePath('/alertes');
}

export async function deleteAlertAction(alertId: string) {
  await api(`/api/alerts/${alertId}`, { method: 'DELETE' });
  revalidatePath('/alertes');
}

export async function createAlertAction(formData: FormData) {
  const name = formData.get('name') as string;
  const keywords = formData.get('keywords') as string;
  const frequency = formData.get('frequency') as string;
  const types = formData.getAll('types') as string[];
  const jurisdiction = formData.get('jurisdiction') as string;

  await api('/alerts', {
    method: 'POST',
    body: {
      name,
      keywords: keywords.split(',').map((k) => k.trim()),
      frequency,
      documentTypes: types,
      jurisdiction: jurisdiction || undefined,
    },
  });

  revalidatePath('/alertes');
}
