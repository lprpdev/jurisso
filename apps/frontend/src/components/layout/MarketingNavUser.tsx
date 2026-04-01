'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './MarketingNav.module.css';

interface MarketingNavUserProps {
  firstName: string;
  lastName: string;
  plan: string;
}

export default function MarketingNavUser({ firstName, lastName, plan }: MarketingNavUserProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = `${(firstName ?? '').charAt(0)}${(lastName ?? '').charAt(0)}`.toUpperCase() || '?';

  return (
    <div className={styles.userWrap} ref={ref}>
      <button
        className={styles.userButton}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className={styles.avatar}>{initials}</span>
        <span className={styles.userName}>{firstName}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownName}>{firstName} {lastName}</span>
            <span className={styles.dropdownPlan}>{plan}</span>
          </div>
          <div className={styles.dropdownDivider} />
          <Link href="/dashboard" className={styles.dropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Tableau de bord
          </Link>
          <Link href="/recherche" className={styles.dropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Recherche
          </Link>
          <Link href="/favoris" className={styles.dropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Favoris
          </Link>
          <Link href="/profil" className={styles.dropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Mon profil
          </Link>
          <div className={styles.dropdownDivider} />
          <button
            className={styles.dropdownItemDanger}
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await fetch('/api/logout', { method: 'POST' });
              window.location.href = '/auth/connexion';
            }}
          >
            Deconnexion
          </button>
        </div>
      )}
    </div>
  );
}
