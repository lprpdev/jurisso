import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Essayez la recherche juridique JURISSO avec des resultats de demonstration.',
};

const fixtureResults = [
  {
    juridiction: 'Cour de cassation',
    chambre: 'Chambre commerciale',
    date: '15 janvier 2025',
    ref: 'Pourvoi n° 23-12.456',
    title:
      'Responsabilite du dirigeant — Faute de gestion — Insuffisance d\'actif',
    excerpt:
      'Attendu que la <mark>responsabilite du dirigeant</mark> pour faute de gestion ne peut etre engagee que si le demandeur etablit l\'existence d\'une faute personnelle separable de ses fonctions, un prejudice certain et un lien de causalite direct entre la faute et le prejudice invoque...',
  },
  {
    juridiction: 'Cour d\'appel de Paris',
    chambre: 'Pole 5, Chambre 8',
    date: '10 decembre 2024',
    ref: 'RG n° 23/04567',
    title:
      'Clause de non-concurrence — Contrepartie financiere — Validite',
    excerpt:
      'Considerant que la clause de <mark>non-concurrence</mark> inseree dans le contrat de travail est nulle en l\'absence de contrepartie financiere, peu important que l\'employeur ait propose une indemnisation a posteriori...',
  },
  {
    juridiction: 'Conseil d\'Etat',
    chambre: '10e chambre',
    date: '22 novembre 2024',
    ref: 'N° 467890',
    title:
      'RGPD — Droit a l\'effacement — Interet public',
    excerpt:
      'Considerant que le droit a l\'effacement prevu par l\'article 17 du <mark>reglement general sur la protection des donnees</mark> ne s\'applique pas lorsque le traitement est necessaire pour des motifs d\'interet public dans le domaine de la sante publique...',
  },
  {
    juridiction: 'Cour de cassation',
    chambre: 'Chambre sociale',
    date: '5 novembre 2024',
    ref: 'Pourvoi n° 23-18.789',
    title:
      'Licenciement — Faute grave — Reseaux sociaux',
    excerpt:
      'Qu\'en statuant ainsi, alors que les propos tenus par le salarie sur un reseau social accessible a un nombre restreint de personnes et relevant de la sphere privee ne constituent pas une cause reelle et serieuse de <mark>licenciement</mark>...',
  },
  {
    juridiction: 'Tribunal judiciaire de Paris',
    chambre: '3e chambre civile',
    date: '18 octobre 2024',
    ref: 'RG n° 24/01234',
    title:
      'Droit d\'auteur — Intelligence artificielle — Oeuvre originale',
    excerpt:
      'Le tribunal considere qu\'une creation generee par un systeme d\'<mark>intelligence artificielle</mark> ne peut beneficier de la protection du droit d\'auteur en l\'absence d\'empreinte de la personnalite de l\'auteur humain...',
  },
];

export default function DemoPage() {
  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>JURISSO</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/fonctionnalites" className={styles.navLink}>Fonctionnalites</Link></li>
          <li><Link href="/tarifs" className={styles.navLink}>Tarifs</Link></li>
          <li><Link href="/a-propos" className={styles.navLink}>A propos</Link></li>
          <li><Link href="/blog" className={styles.navLink}>Blog</Link></li>
        </ul>
        <div className={styles.navRight}>
          <Link href="/auth/connexion" className={styles.navLogin}>Connexion</Link>
          <Link href="/auth/inscription" className={styles.navCta}>Essai gratuit</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Essayez JURISSO</h1>
        <p className={styles.heroSubtitle}>
          Decouvrez la puissance de notre moteur de recherche avec des resultats de demonstration.
        </p>
      </section>

      {/* Search */}
      <section className={styles.searchSection}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="responsabilite dirigeant faute de gestion"
            readOnly
            value="responsabilite dirigeant"
          />
          <button type="button" className={styles.searchButton}>
            Rechercher
          </button>
        </div>
      </section>

      {/* Results */}
      <section className={styles.results}>
        <div className={styles.resultsInner}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              3 247 891 resultats — 5 affiches (demo)
            </span>
            <span className={styles.resultsLabel}>Demo</span>
          </div>

          {fixtureResults.map((result, i) => (
            <div key={i} className={styles.resultCard}>
              <div className={styles.resultMeta}>
                <span className={styles.resultJuridiction}>
                  {result.juridiction}
                </span>
                <span className={styles.resultDate}>{result.date}</span>
                <span className={styles.resultRef}>{result.ref}</span>
              </div>
              <h2 className={styles.resultTitle}>{result.title}</h2>
              <p
                className={styles.resultExcerpt}
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </div>
          ))}

          <div className={styles.notice}>
            <p className={styles.noticeText}>
              Creez un compte pour acceder a l&apos;integralite des resultats,
              filtrer par juridiction, annoter et sauvegarder vos recherches.
            </p>
            <Link href="/auth/inscription" className={styles.noticeLink}>
              Creer mon compte gratuitement
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  );
}
