import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Actualites juridiques, guides pratiques et retours d\'experience sur la recherche juridique avec JURISSO.',
};

const articles = [
  {
    slug: 'open-data-judiciaire-etat-des-lieux-2025',
    title: 'Open data judiciaire : etat des lieux en 2025',
    excerpt:
      'Depuis le decret du 29 juin 2020, l\'ouverture des decisions de justice s\'accelere. Ou en sommes-nous cinq ans plus tard ?',
    author: 'Alexandre Renault',
    date: '15 mars 2025',
    time: '8 min',
    category: 'Open Data',
  },
  {
    slug: 'recherche-juridique-intelligence-artificielle',
    title: 'Comment l\'IA transforme la recherche juridique',
    excerpt:
      'Le traitement du langage naturel permet desormais de rechercher la jurisprudence en langage courant. Tour d\'horizon des possibilites.',
    author: 'Marie Chen',
    date: '8 mars 2025',
    time: '12 min',
    category: 'Intelligence Artificielle',
  },
  {
    slug: 'guide-veille-juridique-efficace',
    title: 'Guide : mettre en place une veille juridique efficace',
    excerpt:
      'Les bonnes pratiques pour organiser votre veille juridique et ne plus passer a cote des decisions importantes.',
    author: 'Thomas Bernard',
    date: '1 mars 2025',
    time: '6 min',
    category: 'Guide Pratique',
  },
  {
    slug: 'rgpd-decisions-marquantes-2024',
    title: 'RGPD : les decisions marquantes de 2024',
    excerpt:
      'Retour sur les arrets et sanctions qui ont faconne le droit de la protection des donnees en France et en Europe cette annee.',
    author: 'Alexandre Renault',
    date: '20 fevrier 2025',
    time: '10 min',
    category: 'Jurisprudence',
  },
  {
    slug: 'annotations-collaboratives-cabinet-avocats',
    title: 'Annotations collaboratives : temoignage d\'un cabinet',
    excerpt:
      'Le cabinet Moreau & Associes partage son experience avec les outils collaboratifs de JURISSO pour gerer ses dossiers.',
    author: 'Camille Durand',
    date: '12 fevrier 2025',
    time: '5 min',
    category: 'Temoignage',
  },
  {
    slug: 'api-jurisso-integration-outils-metier',
    title: 'API JURISSO : integrez la jurisprudence a vos outils',
    excerpt:
      'Decouvrez comment l\'API JURISSO permet d\'integrer la recherche juridique directement dans vos applications metier.',
    author: 'Marie Chen',
    date: '5 fevrier 2025',
    time: '7 min',
    category: 'Technique',
  },
];

export default function BlogPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Blog</h1>
        <p className={styles.heroSubtitle}>
          Actualites juridiques, guides pratiques et retours d&apos;experience.
        </p>
      </section>

      {/* Articles */}
      <section className={styles.articles}>
        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={styles.articleCard}
            >
              <div className={styles.articleImage}>
                <svg className={styles.articleImageIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" />
                  <path d="M3 15l5-5 4 4 3-3 6 6" />
                </svg>
              </div>
              <div className={styles.articleBody}>
                <span className={styles.articleCategory}>{article.category}</span>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <div className={styles.articleMeta}>
                  <span className={styles.articleAuthor}>{article.author}</span>
                  <span className={styles.articleDate}>{article.date}</span>
                  <span className={styles.articleTime}>{article.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
