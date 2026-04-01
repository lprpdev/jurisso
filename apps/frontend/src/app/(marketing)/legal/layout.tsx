import Link from 'next/link';
import styles from './layout.module.css';

const legalPages = [
  { href: '/legal/mentions-legales', label: 'Mentions legales' },
  { href: '/legal/politique-confidentialite', label: 'Politique de confidentialite' },
  { href: '/legal/conditions-generales-utilisation', label: 'CGU' },
  { href: '/legal/conditions-generales-vente', label: 'CGV' },
  { href: '/legal/cookies', label: 'Politique de cookies' },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      {/* Layout */}
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Pages legales</p>
          <ul className={styles.sidebarList}>
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={styles.sidebarLink}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
