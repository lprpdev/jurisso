import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Fonctionnalites',
  description:
    'Decouvrez les outils de JURISSO : recherche plein-texte, alertes intelligentes, annotations, collections, jurisprudence connectee et export PDF.',
};

const features = [
  {
    label: 'Recherche',
    title: 'Recherche plein-texte avancee',
    desc: 'Interrogez 3,2 millions de documents en langage naturel. Notre moteur comprend le vocabulaire juridique, les references de textes et les synonymes. Combinez des filtres par juridiction, date, matiere, formation et numero de pourvoi pour affiner vos resultats.',
    useCases: [
      'Recherche par mots-cles en langage naturel',
      'Filtres par juridiction, matiere et date',
      'Suggestions automatiques de termes juridiques',
      'Resultats classes par pertinence',
    ],
    iconPath: 'M11 11m-8 0a8 8 0 1016 0 8 8 0 10-16 0M21 21l-4.35-4.35',
  },
  {
    label: 'Veille',
    title: 'Alertes intelligentes',
    desc: 'Definissez vos criteres de veille et recevez une notification des qu\'une nouvelle decision ou un nouveau texte correspond a votre recherche. Configurez la frequence, le format et les canaux de notification.',
    useCases: [
      'Alertes par email ou notification push',
      'Frequence quotidienne, hebdomadaire ou en temps reel',
      'Criteres de recherche sauvegardes',
      'Historique des alertes declenchees',
    ],
    iconPath: 'M4 4l8 8M4 20l8-8M20 4l-8 8M20 20l-8-8',
  },
  {
    label: 'Collaboration',
    title: 'Annotations et surlignage',
    desc: 'Surlignez les passages importants, ajoutez des annotations privees ou partagees, et retrouvez facilement vos notes. Ideal pour preparer des conclusions, rediger des memoires ou alimenter un travail de recherche.',
    useCases: [
      'Surlignage avec code couleur',
      'Annotations privees ou partagees',
      'Recherche dans vos annotations',
      'Export des passages annotes',
    ],
    iconPath: 'M4 4h16v16H4zM8 10h8M8 14h4',
  },
  {
    label: 'Organisation',
    title: 'Collections thematiques',
    desc: 'Regroupez decisions, textes et articles dans des collections. Partagez-les avec vos collegues ou collaborateurs. Organisez votre veille par dossier, par client ou par thematique juridique.',
    useCases: [
      'Dossiers par client ou par affaire',
      'Partage avec l\'equipe',
      'Drag & drop pour organiser',
      'Tags et etiquettes personnalisees',
    ],
    iconPath: 'M4 4h8v8H4zM16 4h8v8h-8zM4 16h8v8H4zM16 16h8v8h-8z',
  },
  {
    label: 'Analyse',
    title: 'Jurisprudence connectee',
    desc: 'Visualisez le reseau de la jurisprudence : decisions citees, decisions citantes, evolution de la doctrine et revirements. Comprenez la portee d\'une decision en un coup d\'oeil grace au graphe interactif.',
    useCases: [
      'Graphe de citations interactif',
      'Detection des revirements',
      'Analyse de l\'evolution doctrinale',
      'Identification des decisions phares',
    ],
    iconPath: 'M8 4v24M24 4v24M8 12h16M8 20h16',
  },
  {
    label: 'Productivite',
    title: 'Export professionnel PDF',
    desc: 'Generez des documents PDF professionnels contenant les decisions selectionnees, vos annotations et une table des matieres. Pret pour inclusion dans vos conclusions, memoires ou dossiers clients.',
    useCases: [
      'Export PDF avec mise en page juridique',
      'Inclusion des annotations',
      'Table des matieres automatique',
      'En-tete et pied de page personnalisables',
    ],
    iconPath: 'M6 26V6h14l6 6v14H6zM20 6v6h6',
  },
];

export default function FonctionnalitesPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Des outils penses pour les juristes</h1>
        <p className={styles.heroSubtitle}>
          Six fonctionnalites essentielles pour transformer votre pratique
          juridique au quotidien.
        </p>
      </section>

      {/* Feature sections */}
      {features.map((feature, i) => (
        <section
          key={feature.label}
          className={i % 2 === 0 ? styles.featureSection : styles.featureSectionAlt}
        >
          <div className={i % 2 === 0 ? styles.featureInner : styles.featureInnerReverse}>
            {i % 2 === 1 && (
              <div className={styles.featureIllustration}>
                <div className={styles.illustrationPlaceholder}>
                  <svg className={styles.illustrationIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={feature.iconPath} />
                  </svg>
                </div>
              </div>
            )}
            <div className={styles.featureContent}>
              <p className={styles.featureLabel}>{feature.label}</p>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureDesc}>{feature.desc}</p>
              <ul className={styles.featureUseCases}>
                {feature.useCases.map((uc) => (
                  <li key={uc} className={styles.featureUseCase}>{uc}</li>
                ))}
              </ul>
            </div>
            {i % 2 === 0 && (
              <div className={styles.featureIllustration}>
                <div className={styles.illustrationPlaceholder}>
                  <svg className={styles.illustrationIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={feature.iconPath} />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Pret a transformer votre pratique ?</h2>
        <p className={styles.ctaSubtitle}>
          Commencez gratuitement avec 50 recherches offertes.
        </p>
        <Link href="/auth/inscription" className={styles.ctaButton}>
          Creer mon compte
        </Link>
      </section>
    </div>
  );
}
