'use client';

import { useActionState, useState } from 'react';
import { registerAction, type RegisterState } from './actions';
import Input from '@/components/ui/Input/Input';
import Select from '@/components/ui/Select/Select';
import Button from '@/components/ui/Button/Button';
import PasswordStrength from '@/components/ui/PasswordStrength/PasswordStrength';
import styles from './page.module.css';

const PROFESSIONS = [
  { value: '', label: 'Sélectionnez votre profession' },
  { value: 'avocat', label: 'Avocat' },
  { value: 'juriste', label: "Juriste d'entreprise" },
  { value: 'magistrat', label: 'Magistrat' },
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'chercheur', label: 'Chercheur' },
  { value: 'autre', label: 'Autre' },
];

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(
    registerAction,
    {},
  );
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form action={formAction} className={styles.form}>
      {state.error && (
        <div className={styles.errorMessage}>{state.error}</div>
      )}

      <div className={styles.nameRow}>
        <Input
          name="firstName"
          label="Prénom"
          placeholder="Jean"
          required
          autoComplete="given-name"
        />
        <Input
          name="lastName"
          label="Nom"
          placeholder="Dupont"
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        name="email"
        type="email"
        label="Adresse email"
        placeholder="jean.dupont@cabinet.fr"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />

      <Select
        name="profession"
        label="Profession"
        options={PROFESSIONS}
        required
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />

      {profession === 'avocat' && (
        <Input
          name="barNumber"
          label="Numéro de barreau"
          placeholder="Ex: Paris 12345"
          autoComplete="off"
        />
      )}

      <div>
        <Input
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="8 caractères minimum"
          required
          autoComplete="new-password"
          error={state.fieldErrors?.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
      </div>

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmer le mot de passe"
        required
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="cgu" required />
          <span>
            J&apos;accepte les{' '}
            <a href="/cgu" target="_blank" rel="noopener noreferrer">
              CGU
            </a>{' '}
            et la{' '}
            <a
              href="/confidentialite"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité
            </a>
          </span>
        </label>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="newsletter" />
          <span>Je souhaite recevoir la newsletter juridique</span>
        </label>
      </div>

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Création en cours\u2026' : 'Créer mon compte'}
      </Button>
    </form>
  );
}
