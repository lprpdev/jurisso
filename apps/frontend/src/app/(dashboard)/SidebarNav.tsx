'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const MAIN_NAV: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Tableau de bord',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <rect x="1" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/recherche',
    label: 'Recherche',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/favoris',
    label: 'Favoris',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <path d="M9 2L11.1 6.3L16 6.9L12.5 10.3L13.3 15.2L9 12.9L4.7 15.2L5.5 10.3L2 6.9L6.9 6.3L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/collections',
    label: 'Collections',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <rect x="2" y="4" width="14" height="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 4V2H13V4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/alertes',
    label: 'Alertes',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <path d="M9 1.5C5.96 1.5 3.5 3.96 3.5 7V10.5L2 12.5V13.5H16V12.5L14.5 10.5V7C14.5 3.96 12.04 1.5 9 1.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 13.5V14.5C7 15.6 7.9 16.5 9 16.5C10.1 16.5 11 15.6 11 14.5V13.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/annotations',
    label: 'Annotations',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <path d="M2 2H12L16 6V16H2V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 9H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/historique',
    label: 'Historique',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SECONDARY_NAV: NavItem[] = [
  {
    href: '/profil',
    label: 'Profil',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 16C2 13.24 5.13 11 9 11C12.87 11 16 13.24 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/parametres',
    label: 'Paramètres',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.34 3.34L4.76 4.76M13.24 13.24L14.66 14.66M14.66 3.34L13.24 4.76M4.76 13.24L3.34 14.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/aide',
    label: 'Aide',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" className={styles.navIcon}>
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7C7 5.9 7.9 5 9 5C10.1 5 11 5.9 11 7C11 8 9.5 8 9.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9.5" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <>
      <div className={styles.navGroup}>
        {MAIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      <div className={styles.navDivider} />

      <div className={styles.navGroup}>
        {SECONDARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
