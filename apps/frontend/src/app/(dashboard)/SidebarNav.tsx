'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
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
    label: 'Parametres',
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
    return pathname.startsWith(href);
  }

  return (
    <>
      <div className={styles.navGroup}>
        {NAV_ITEMS.map((item) => (
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
