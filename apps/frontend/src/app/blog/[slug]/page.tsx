import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  time: string;
  category: string;
  toc: string[];
  content: string;
}

const articles: Record<string, ArticleData> = {
  'open-data-judiciaire-etat-des-lieux-2025': {
    slug: 'open-data-judiciaire-etat-des-lieux-2025',
    title: 'Open data judiciaire : etat des lieux en 2025',
    excerpt: 'Depuis le decret du 29 juin 2020, l\'ouverture des decisions de justice s\'accelere.',
    author: 'Alexandre Renault',
    authorRole: 'CEO & Co-fondateur de JURISSO. Ancien avocat au Barreau de Paris.',
    date: '15 mars 2025',
    time: '8 min',
    category: 'Open Data',
    toc: ['Contexte historique', 'Le cadre legal', 'Etat des lieux', 'Les defis restants', 'Perspectives'],
    content: `
      <h2>Contexte historique</h2>
      <p>L'ouverture des donnees judiciaires en France est un processus entame depuis plusieurs decennies. La loi Lemaire de 2016 a pose les bases en consacrant le principe de mise a disposition gratuite des decisions de justice, sous reserve de la protection des donnees personnelles.</p>
      <p>Le decret du 29 juin 2020 est venu preciser les modalites de cette ouverture, en confiant a la Cour de cassation la mission de diffuser les decisions de l'ordre judiciaire via la plateforme Judilibre.</p>

      <h2>Le cadre legal</h2>
      <p>Le cadre juridique repose sur plusieurs textes fondamentaux :</p>
      <ul>
        <li>L'article L111-13 du Code de l'organisation judiciaire, qui pose le principe de publicite des decisions</li>
        <li>La loi n° 2016-1321 du 7 octobre 2016 pour une Republique numerique</li>
        <li>Le decret n° 2020-797 du 29 juin 2020 relatif a la mise a disposition du public des decisions de justice</li>
        <li>Le reglement europeen sur la protection des donnees (RGPD)</li>
      </ul>

      <h2>Etat des lieux</h2>
      <p>En 2025, plus de 3,2 millions de decisions sont accessibles en open data. La Cour de cassation publie l'integralite de ses arrets, et les cours d'appel suivent progressivement le mouvement.</p>
      <blockquote><p>L'open data judiciaire est desormais une realite tangible, meme si des progres restent a faire en matiere de completude et de qualite des donnees.</p></blockquote>
      <p>Les juridictions administratives, via le Conseil d'Etat, disposent egalement de leur propre base de donnees ouverte, avec des volumes comparables.</p>

      <h2>Les defis restants</h2>
      <p>Malgre les avancees considerables, plusieurs defis subsistent. La pseudonymisation des decisions, necessaire pour proteger les parties, reste un processus complexe qui peut introduire des erreurs. La completude des bases n'est pas encore assuree pour toutes les juridictions de premiere instance.</p>
      <p>La qualite des metadonnees associees aux decisions (references de textes, matieres, mots-cles) est variable selon les juridictions, ce qui complique l'exploitation automatisee des corpus.</p>

      <h2>Perspectives</h2>
      <p>L'avenir de l'open data judiciaire passe par l'amelioration continue des processus de pseudonymisation, l'enrichissement des metadonnees et l'extension du perimetre aux juridictions de premiere instance. Les acteurs de la legal tech, dont JURISSO, contribuent a cet ecosysteme en rendant ces donnees accessibles et exploitables par les professionnels du droit.</p>
    `,
  },
  'recherche-juridique-intelligence-artificielle': {
    slug: 'recherche-juridique-intelligence-artificielle',
    title: 'Comment l\'IA transforme la recherche juridique',
    excerpt: 'Le traitement du langage naturel permet desormais de rechercher la jurisprudence en langage courant.',
    author: 'Marie Chen',
    authorRole: 'Head of Data chez JURISSO. Docteure en informatique, Paris-Saclay.',
    date: '8 mars 2025',
    time: '12 min',
    category: 'Intelligence Artificielle',
    toc: ['Introduction', 'Le NLP juridique', 'Applications concretes', 'Limites et precautions', 'Conclusion'],
    content: `
      <h2>Introduction</h2>
      <p>L'intelligence artificielle revolutionne de nombreux secteurs, et le droit n'echappe pas a cette transformation. La recherche juridique, traditionnellement fondee sur des mots-cles exacts et des references precises, beneficie desormais des avancees du traitement du langage naturel.</p>

      <h2>Le NLP juridique</h2>
      <p>Le traitement du langage naturel (NLP) applique au domaine juridique pose des defis specifiques. Le vocabulaire juridique est technique, polysemique et evolutif. Les phrases sont souvent longues et complexes, avec des references croisees entre textes.</p>
      <p>Les modeles de langue specialises dans le domaine juridique, entraines sur des corpus de decisions et de textes legislatifs, permettent de depasser ces difficultes en comprenant le contexte et la semantique des requetes.</p>

      <h2>Applications concretes</h2>
      <p>Plusieurs applications concretes emergent :</p>
      <ul>
        <li>La recherche semantique : trouver des decisions pertinentes a partir d'une description en langage courant</li>
        <li>La detection de liens entre decisions : identifier automatiquement les arrets cites et citants</li>
        <li>Le resume automatique : generer des syntheses de decisions longues</li>
        <li>La classification : categoriser automatiquement les decisions par matiere et sous-matiere</li>
      </ul>

      <h2>Limites et precautions</h2>
      <p>L'IA ne remplace pas le juriste. Elle est un outil d'aide a la recherche qui doit etre utilise avec discernement. Les resultats doivent toujours etre verifies et contextualises par un professionnel du droit.</p>
      <blockquote><p>L'IA est un formidable accelerateur de recherche, mais la qualification juridique reste l'apanage du professionnel.</p></blockquote>

      <h2>Conclusion</h2>
      <p>L'intelligence artificielle transforme la recherche juridique en la rendant plus accessible, plus rapide et plus exhaustive. Les professionnels du droit qui adoptent ces outils gagnent un avantage competitif significatif, tout en conservant leur role essentiel d'analyse et de qualification.</p>
    `,
  },
  'guide-veille-juridique-efficace': {
    slug: 'guide-veille-juridique-efficace',
    title: 'Guide : mettre en place une veille juridique efficace',
    excerpt: 'Les bonnes pratiques pour organiser votre veille juridique.',
    author: 'Thomas Bernard',
    authorRole: 'Head of Product chez JURISSO. 8 ans d\'experience en LegalTech.',
    date: '1 mars 2025',
    time: '6 min',
    category: 'Guide Pratique',
    toc: ['Pourquoi veiller ?', 'Definir son perimetre', 'Choisir ses outils', 'Organiser le flux', 'Bonnes pratiques'],
    content: `
      <h2>Pourquoi veiller ?</h2>
      <p>La veille juridique est une obligation pour tout professionnel du droit. L'evolution constante de la legislation, de la jurisprudence et de la doctrine impose de rester informe en permanence. Une veille mal organisee expose a des risques d'erreur, de conseil inadapte ou de non-conformite.</p>

      <h2>Definir son perimetre</h2>
      <p>La premiere etape consiste a definir precisement les domaines a surveiller. Il est preferable de commencer avec un perimetre restreint et de l'elargir progressivement. Pour chaque domaine, identifiez les sources pertinentes : codes, juridictions, publications officielles.</p>

      <h2>Choisir ses outils</h2>
      <p>Les outils de veille juridique se repartissent en plusieurs categories :</p>
      <ul>
        <li>Les plateformes de recherche juridique comme JURISSO, avec alertes integrees</li>
        <li>Les flux RSS des publications officielles</li>
        <li>Les newsletters specialisees par domaine</li>
        <li>Les reseaux professionnels et groupes de discussion</li>
      </ul>

      <h2>Organiser le flux</h2>
      <p>Une veille efficace repose sur un flux organise. Definissez des moments dedies a la consultation de vos alertes. Classez les informations par priorite et par domaine. Utilisez des collections pour archiver les decisions et textes importants.</p>

      <h2>Bonnes pratiques</h2>
      <p>Quelques bonnes pratiques eprouvees : limitez le nombre d'alertes pour eviter la surcharge informationnelle, annotez immediatement les elements pertinents, partagez les decouvertes avec votre equipe, et revisez periodiquement votre perimetre de veille.</p>
    `,
  },
  'rgpd-decisions-marquantes-2024': {
    slug: 'rgpd-decisions-marquantes-2024',
    title: 'RGPD : les decisions marquantes de 2024',
    excerpt: 'Retour sur les arrets et sanctions qui ont faconne le droit de la protection des donnees.',
    author: 'Alexandre Renault',
    authorRole: 'CEO & Co-fondateur de JURISSO. Ancien avocat au Barreau de Paris.',
    date: '20 fevrier 2025',
    time: '10 min',
    category: 'Jurisprudence',
    toc: ['Vue d\'ensemble', 'Sanctions majeures', 'Arrets de la CJUE', 'Decisions de la CNIL', 'Impact pratique'],
    content: `
      <h2>Vue d'ensemble</h2>
      <p>L'annee 2024 a ete marquee par plusieurs decisions fondamentales en matiere de protection des donnees personnelles. Les autorites de controle europeennes ont poursuivi leur action repressive, tandis que la Cour de justice de l'Union europeenne a apporte des precisions importantes sur l'interpretation du RGPD.</p>

      <h2>Sanctions majeures</h2>
      <p>Les sanctions prononcees en 2024 confirment la tendance a la hausse des montants. Plusieurs entreprises technologiques ont ete sanctionnees pour des manquements relatifs au consentement, au transfert de donnees hors UE et a la securite des traitements.</p>

      <h2>Arrets de la CJUE</h2>
      <p>La Cour de justice a rendu plusieurs arrets importants, notamment sur la notion de dommage moral en matiere de violation de donnees, sur les conditions du profilage automatise et sur l'articulation entre le RGPD et les legislations sectorielles.</p>

      <h2>Decisions de la CNIL</h2>
      <p>La CNIL a continue son action de controle avec des decisions portant sur les cookies, la videosurveillance, les applications mobiles et les systemes d'intelligence artificielle. La formation restreinte a prononce des sanctions significatives contre plusieurs acteurs du numerique.</p>

      <h2>Impact pratique</h2>
      <p>Pour les professionnels, ces decisions impliquent une vigilance accrue sur les bases legales des traitements, les mecanismes de consentement et les mesures de securite. La conformite RGPD n'est plus une option mais une necessite operationnelle.</p>
    `,
  },
  'annotations-collaboratives-cabinet-avocats': {
    slug: 'annotations-collaboratives-cabinet-avocats',
    title: 'Annotations collaboratives : temoignage d\'un cabinet',
    excerpt: 'Le cabinet Moreau & Associes partage son experience avec JURISSO.',
    author: 'Camille Durand',
    authorRole: 'CTO & Co-fondatrice de JURISSO. Ingenieure Polytechnique.',
    date: '12 fevrier 2025',
    time: '5 min',
    category: 'Temoignage',
    toc: ['Le contexte', 'La problematique', 'La solution', 'Les resultats', 'Temoignage'],
    content: `
      <h2>Le contexte</h2>
      <p>Le cabinet Moreau & Associes est un cabinet d'avocats parisien specialise en droit des affaires et en contentieux commercial. Avec 15 avocats et 5 juristes, le cabinet traite chaque annee plusieurs centaines de dossiers necessitant une recherche jurisprudentielle approfondie.</p>

      <h2>La problematique</h2>
      <p>Avant JURISSO, chaque avocat du cabinet effectuait ses recherches de maniere isolee. Les decisions pertinentes etaient sauvegardees dans des dossiers individuels, sans possibilite de partage ou de capitalisation au sein de l'equipe. Le temps consacre a la recherche etait considerable et souvent redondant.</p>

      <h2>La solution</h2>
      <p>Le cabinet a adopte JURISSO avec le plan Enterprise, permettant a l'ensemble de l'equipe de partager annotations, collections et favoris. Les collaborateurs annotent les decisions importantes et les classent dans des collections par dossier client.</p>

      <h2>Les resultats</h2>
      <p>Apres six mois d'utilisation, le cabinet constate une reduction de 60 % du temps consacre a la recherche jurisprudentielle. La qualite des recherches s'est amelioree grace a la capitalisation des connaissances au sein de l'equipe.</p>

      <h2>Temoignage</h2>
      <blockquote><p>Depuis que notre equipe utilise JURISSO, notre productivite sur les dossiers contentieux a double. Les annotations partagees nous evitent de refaire des recherches deja effectuees par un collegue. C'est un gain de temps et de qualite considerable.</p></blockquote>
      <p>— Me. Pierre Moreau, associe fondateur</p>
    `,
  },
  'api-jurisso-integration-outils-metier': {
    slug: 'api-jurisso-integration-outils-metier',
    title: 'API JURISSO : integrez la jurisprudence a vos outils',
    excerpt: 'Decouvrez comment l\'API JURISSO permet d\'integrer la recherche juridique dans vos applications.',
    author: 'Marie Chen',
    authorRole: 'Head of Data chez JURISSO. Docteure en informatique, Paris-Saclay.',
    date: '5 fevrier 2025',
    time: '7 min',
    category: 'Technique',
    toc: ['Presentation', 'Architecture', 'Endpoints principaux', 'Exemples d\'integration', 'Authentification'],
    content: `
      <h2>Presentation</h2>
      <p>L'API JURISSO permet aux developpeurs d'integrer la recherche juridique directement dans leurs applications metier. Que vous developpiez un outil de gestion de cabinet, une plateforme de conformite ou un systeme d'aide a la decision, l'API vous donne acces a l'ensemble du corpus jurisprudentiel.</p>

      <h2>Architecture</h2>
      <p>L'API est construite selon les principes REST, avec des endpoints JSON clairement documentes. Elle supporte la pagination, le filtrage avance et la recherche plein-texte. Les reponses incluent les metadonnees completes des decisions : juridiction, date, matiere, parties pseudonymisees et texte integral.</p>

      <h2>Endpoints principaux</h2>
      <ul>
        <li>GET /api/v1/decisions — Recherche et filtrage des decisions</li>
        <li>GET /api/v1/decisions/:id — Detail d'une decision</li>
        <li>GET /api/v1/textes — Recherche dans les textes legislatifs</li>
        <li>GET /api/v1/alertes — Gestion des alertes programmatiques</li>
        <li>POST /api/v1/collections — Creation et gestion de collections</li>
      </ul>

      <h2>Exemples d'integration</h2>
      <p>Plusieurs cas d'usage sont documentes : integration dans un CRM juridique, alimentation d'un tableau de bord de conformite, enrichissement automatique de dossiers clients. Les exemples de code sont disponibles en Python, JavaScript et PHP.</p>

      <h2>Authentification</h2>
      <p>L'API utilise OAuth 2.0 avec des cles API dediees. Chaque requete est authentifiee et les quotas sont geres par cle. Le plan Enterprise offre des quotas personnalises et un support technique dedie pour l'integration.</p>
    `,
  },
};

const allSlugs = Object.keys(articles);

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = articles[slug];
    if (!article) return { title: 'Article introuvable' };
    return {
      title: article.title,
      description: article.excerpt,
    };
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const relatedSlugs = allSlugs.filter((s) => s !== slug).slice(0, 3);

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

      {/* Header */}
      <header className={styles.header}>
        <p className={styles.breadcrumb}>
          <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
          {' / '}
          {article.category}
        </p>
        <span className={styles.category}>{article.category}</span>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>
          <span>{article.author}</span>
          <span>{article.date}</span>
          <span>{article.time} de lecture</span>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        <aside className={styles.toc}>
          <p className={styles.tocTitle}>Sommaire</p>
          <ul className={styles.tocList}>
            {article.toc.map((item) => (
              <li key={item} className={styles.tocItem}>{item}</li>
            ))}
          </ul>
        </aside>
        <div>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className={styles.share}>
            <span className={styles.shareLabel}>Partager</span>
            <a href="#" className={styles.shareButton} aria-label="Partager sur Twitter">
              <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className={styles.shareButton} aria-label="Partager sur LinkedIn">
              <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </a>
            <a href="#" className={styles.shareButton} aria-label="Copier le lien">
              <svg className={styles.shareIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </a>
          </div>

          {/* Author Bio */}
          <div className={styles.authorBio}>
            <div className={styles.authorAvatar}>
              <svg className={styles.authorAvatarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
              </svg>
            </div>
            <div>
              <p className={styles.authorName}>{article.author}</p>
              <p className={styles.authorRole}>{article.authorRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className={styles.related}>
        <h2 className={styles.relatedTitle}>Articles associes</h2>
        <div className={styles.relatedGrid}>
          {relatedSlugs.map((s) => {
            const a = articles[s];
            return (
              <Link key={s} href={`/blog/${s}`} className={styles.relatedCard}>
                <h3 className={styles.relatedCardTitle}>{a.title}</h3>
                <p className={styles.relatedCardExcerpt}>{a.excerpt}</p>
              </Link>
            );
          })}
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
