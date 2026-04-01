import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    template: '%s | JURISSO',
    default: 'Authentification | JURISSO',
  },
};

const QUOTES = [
  {
    text: 'Le droit est la plus puissante des écoles de l\u2019imagination.',
    author: 'Jean Giraudoux',
  },
  {
    text: 'Nul n\u2019est censé ignorer la loi.',
    author: 'Adage juridique',
  },
  {
    text: 'La justice est la première vertu des institutions sociales.',
    author: 'John Rawls',
  },
  {
    text: 'Le droit positif est l\u2019ensemble des règles juridiques en vigueur dans un État.',
    author: 'Doctrine',
  },
];

function getQuote() {
  const index = Math.floor(Date.now() / 60_000) % QUOTES.length;
  return QUOTES[index];
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quote = getQuote();

  return (
    <div className={styles.authLayout}>
      <aside className={styles.leftPanel}>
        <div>
          <Link href="/" className={styles.logo}>
            JURISSO
          </Link>
          <p className={styles.slogan}>
            Recherche juridique intelligente
          </p>
        </div>

        <div className={styles.quoteBlock}>
          <blockquote>
            <p className={styles.quoteText}>
              &laquo;&nbsp;{quote.text}&nbsp;&raquo;
            </p>
            <footer className={styles.quoteAuthor}>
              — {quote.author}
            </footer>
          </blockquote>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>3,2M+</span>
            <span className={styles.statLabel}>Décisions</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>450K+</span>
            <span className={styles.statLabel}>Textes</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>12K+</span>
            <span className={styles.statLabel}>Professionnels</span>
          </div>
        </div>
      </aside>

      <main className={styles.rightPanel}>
        <div className={styles.formArea}>{children}</div>
      </main>
    </div>
  );
}
