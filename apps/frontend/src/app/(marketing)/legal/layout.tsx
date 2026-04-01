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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <h4 className={styles.footerHeading}>Produit</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/fonctionnalites" className={styles.footerLink}>Fonctionnalites</Link></li>
              <li><Link href="/tarifs" className={styles.footerLink}>Tarifs</Link></li>
              <li><Link href="/demo" className={styles.footerLink}>Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Ressources</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
              <li><Link href="/documentation" className={styles.footerLink}>Documentation</Link></li>
              <li><Link href="/api" className={styles.footerLink}>API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/legal/mentions-legales" className={styles.footerLink}>Mentions legales</Link></li>
              <li><Link href="/legal/politique-confidentialite" className={styles.footerLink}>Confidentialite</Link></li>
              <li><Link href="/legal/conditions-generales-utilisation" className={styles.footerLink}>CGU</Link></li>
              <li><Link href="/legal/conditions-generales-vente" className={styles.footerLink}>CGV</Link></li>
              <li><Link href="/legal/cookies" className={styles.footerLink}>Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li><a href="mailto:contact@jurisso.fr" className={styles.footerLink}>contact@jurisso.fr</a></li>
              <li><span className={styles.footerLink}>Paris, France</span></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>&copy; 2025 JURISSO SAS. Tous droits reserves.</p>
        </div>
      </footer>
    </>
  );
}
