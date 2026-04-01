import Link from 'next/link';
import styles from './MarketingFooter.module.css';

export default function MarketingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h4 className={styles.heading}>Produit</h4>
          <ul className={styles.links}>
            <li><Link href="/fonctionnalites" className={styles.link}>Fonctionnalites</Link></li>
            <li><Link href="/tarifs" className={styles.link}>Tarifs</Link></li>
            <li><Link href="/demo" className={styles.link}>Demo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Ressources</h4>
          <ul className={styles.links}>
            <li><Link href="/blog" className={styles.link}>Blog</Link></li>
            <li><Link href="/documentation" className={styles.link}>Documentation</Link></li>
            <li><Link href="/api" className={styles.link}>API</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Legal</h4>
          <ul className={styles.links}>
            <li><Link href="/legal/mentions-legales" className={styles.link}>Mentions legales</Link></li>
            <li><Link href="/legal/politique-confidentialite" className={styles.link}>Confidentialite</Link></li>
            <li><Link href="/legal/conditions-generales-utilisation" className={styles.link}>CGU</Link></li>
            <li><Link href="/legal/conditions-generales-vente" className={styles.link}>CGV</Link></li>
            <li><Link href="/legal/cookies" className={styles.link}>Cookies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.links}>
            <li><a href="mailto:contact@jurisso.fr" className={styles.link}>contact@jurisso.fr</a></li>
            <li><span className={styles.link}>Paris, France</span></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copy}>&copy; 2025 JURISSO SAS. Tous droits reserves.</p>
      </div>
    </footer>
  );
}
