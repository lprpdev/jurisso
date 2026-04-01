'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const TABS = [
  { href: '/dashboard', label: 'Accueil' },
  { href: '/recherche', label: 'Recherche' },
  { href: '/favoris', label: 'Favoris' },
  { href: '/collections', label: 'Collections' },
  { href: '/alertes', label: 'Alertes' },
];

export default function DashboardPillTabs() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <div className={styles.pillTabs}>
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`${styles.pillTab} ${isActive(tab.href) ? styles.pillTabActive : ''}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
