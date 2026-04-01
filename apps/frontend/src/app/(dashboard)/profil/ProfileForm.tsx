'use client';

import { useActionState } from 'react';
import { updateProfileAction, type ProfileState } from './actions';
import Input from '@/components/ui/Input/Input';
import Select from '@/components/ui/Select/Select';
import styles from './page.module.css';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  profession: string;
  barNumber?: string;
}

const PROFESSIONS = [
  { value: 'avocat', label: 'Avocat' },
  { value: 'juriste', label: "Juriste d'entreprise" },
  { value: 'magistrat', label: 'Magistrat' },
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'chercheur', label: 'Chercheur' },
  { value: 'autre', label: 'Autre' },
];

export function ProfileForm({ user }: { user: UserData }) {
  const [state, formAction, isPending] = useActionState<ProfileState, FormData>(
    updateProfileAction,
    {},
  );

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.fieldRow}>
        <Input
          name="firstName"
          label="Prénom"
          defaultValue={user.firstName}
          required
        />
        <Input
          name="lastName"
          label="Nom"
          defaultValue={user.lastName}
          required
        />
      </div>

      <div className={styles.readOnlyField}>
        <span className={styles.readOnlyLabel}>Email</span>
        <span className={styles.readOnlyValue}>
          {user.email}
          {user.emailVerified && (
            <span className={styles.verifiedBadge}>Vérifié</span>
          )}
        </span>
      </div>

      <Select
        name="profession"
        label="Profession"
        options={PROFESSIONS}
        defaultValue={user.profession}
      />

      {user.profession === 'avocat' && (
        <Input
          name="barNumber"
          label="Numéro de barreau"
          defaultValue={user.barNumber ?? ''}
        />
      )}

      {state.success && (
        <p className={styles.successMessage}>Profil mis à jour avec succès.</p>
      )}
      {state.error && <p className={styles.errorMessage}>{state.error}</p>}

      <button
        type="submit"
        className={styles.saveBtn}
        disabled={isPending}
      >
        {isPending ? 'Enregistrement\u2026' : 'Enregistrer'}
      </button>
    </form>
  );
}
