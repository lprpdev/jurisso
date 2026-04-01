'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

interface DashboardUserMenuProps {
  initials: string;
  firstName: string;
  lastName: string;
  plan: string;
}

export default function DashboardUserMenu({ initials, firstName, lastName, plan }: DashboardUserMenuProps) {
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

  return (
    <div className={styles.avatarDropdown} ref={ref}>
      <button
        type="button"
        className={styles.avatarButton}
        aria-label="Menu utilisateur"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {initials.toUpperCase()}
      </button>
      {open && (
        <div className={styles.userDropdown} role="menu">
          <div className={styles.userDropdownHeader}>
            <span className={styles.userDropdownName}>{firstName} {lastName}</span>
            <span className={styles.userDropdownPlan}>{plan}</span>
          </div>
          <div className={styles.userDropdownDivider} />
          <Link href="/profil" className={styles.userDropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Mon profil
          </Link>
          <Link href="/parametres" className={styles.userDropdownItem} role="menuitem" onClick={() => setOpen(false)}>
            Parametres
          </Link>
          <div className={styles.userDropdownDivider} />
          <button
            className={styles.userDropdownItemDanger}
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
