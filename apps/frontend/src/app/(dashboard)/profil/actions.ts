'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { api } from '@/lib/api';

export interface ProfileState {
  error?: string;
  success?: boolean;
}

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const profession = formData.get('profession') as string;
  const barNumber = formData.get('barNumber') as string;

  try {
    await api('/users/me', {
      method: 'PATCH',
      body: {
        firstName,
        lastName,
        profession,
        barNumber: profession === 'avocat' ? barNumber : undefined,
      },
    });
    revalidatePath('/profil');
    return { success: true };
  } catch {
    return { error: 'Impossible de mettre à jour le profil.' };
  }
}

export interface PasswordState {
  error?: string;
  success?: boolean;
}

export async function changePasswordAction(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas.' };
  }

  if (newPassword.length < 8) {
    return { error: 'Le mot de passe doit contenir au moins 8 caractères.' };
  }

  try {
    await api('/users/me/password', {
      method: 'PUT',
      body: { currentPassword, newPassword },
    });
    return { success: true };
  } catch {
    return { error: 'Mot de passe actuel incorrect.' };
  }
}

export async function toggle2FAAction(
  enable: boolean,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (enable) {
      await api('/users/me/2fa/enable', { method: 'POST' });
    } else {
      await api('/users/me/2fa/disable', { method: 'POST' });
    }
    revalidatePath('/profil');
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Impossible de modifier la 2FA.',
    };
  }
}

export interface DeleteAccountState {
  error?: string;
}

export async function deleteAccountAction(
  _prev: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const confirmEmail = formData.get('confirmEmail') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  try {
    await api('/users/me', {
      method: 'DELETE',
      body: { email: confirmEmail, password: confirmPassword },
    });
  } catch {
    return { error: 'Email ou mot de passe incorrect.' };
  }

  // Clear the access token cookie to log out
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  redirect('/auth/connexion');
}
