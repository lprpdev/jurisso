import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Guide complet pour utiliser JURISSO : recherche, alertes, annotations, collections et API.',
};

const SECTIONS = [
  {
    id: 'demarrage',
    title: 'Demarrage rapide',
    content: [
      {
        title: 'Creer un compte',
        text: 'Rendez-vous sur la page d\u2019inscription, remplissez le formulaire avec vos informations professionnelles et validez votre adresse email. Votre compte est immediatement actif avec le plan Gratuit (50 recherches/mois).',
      },
      {
        title: 'Premiere recherche',
        text: 'Depuis le tableau de bord ou la page Recherche, saisissez vos termes dans la barre de recherche. JURISSO interroge 3,2 millions de decisions de justice et 450 000 textes legislatifs en temps reel. Utilisez les filtres (type, juridiction, matiere, periode) pour affiner vos resultats.',
      },
      {
        title: 'Naviguer dans l\u2019interface',
        text: 'Le menu lateral gauche vous donne acces a toutes les sections : Tableau de bord, Recherche, Favoris, Collections, Alertes, Annotations et Historique. La barre superieure contient la recherche globale et votre profil.',
      },
    ],
  },
  {
    id: 'recherche',
    title: 'Recherche avancee',
    content: [
      {
        title: 'Recherche plein-texte',
        text: 'JURISSO utilise la recherche plein-texte PostgreSQL avec support du francais (stemming, lemmatisation). Saisissez des termes en langage naturel : "responsabilite civile defaut produit" renverra les decisions pertinentes meme si les termes exacts ne figurent pas dans le texte.',
      },
      {
        title: 'Filtres disponibles',
        text: 'Type de document (decision, loi, decret, ordonnance, circulaire), Juridiction (Cour de cassation, Conseil d\u2019Etat, cours d\u2019appel...), Matiere (civil, penal, administratif, commercial...), Periode (dates de debut et fin), Solution (rejet, cassation, irrecevabilite...).',
      },
      {
        title: 'Tri des resultats',
        text: 'Triez par pertinence (score de correspondance) ou par date (plus recentes en premier). La pertinence prend en compte la frequence des termes, leur position dans le document et la date de la decision.',
      },
      {
        title: 'Suggestions automatiques',
        text: 'En saisissant votre requete, JURISSO propose des suggestions basees sur les recherches frequentes, les juridictions et les mots-cles indexes.',
      },
    ],
  },
  {
    id: 'favoris',
    title: 'Favoris et collections',
    content: [
      {
        title: 'Ajouter un favori',
        text: 'Cliquez sur l\u2019icone coeur sur une carte de resultat ou dans la vue document. Vous pouvez ajouter une note personnelle a chaque favori.',
      },
      {
        title: 'Creer une collection',
        text: 'Les collections vous permettent d\u2019organiser vos documents par dossier, theme ou projet. Creez une collection depuis la page Collections, attribuez-lui un nom, une couleur et une description. Ajoutez ensuite des documents depuis les resultats de recherche ou la vue document.',
      },
      {
        title: 'Collections publiques',
        text: 'Activez l\u2019option "Publique" pour partager votre collection via un lien. Les collections publiques sont accessibles en lecture seule par toute personne disposant du lien.',
      },
    ],
  },
  {
    id: 'alertes',
    title: 'Alertes juridiques',
    content: [
      {
        title: 'Creer une alerte',
        text: 'Definissez des criteres de recherche (mots-cles, type de document, juridiction) et choisissez une frequence : quotidienne (envoi chaque matin a 8h) ou hebdomadaire (envoi chaque lundi a 8h).',
      },
      {
        title: 'Gerer ses alertes',
        text: 'Depuis la page Alertes, activez, desactivez ou modifiez vos alertes a tout moment. Le plan Gratuit ne comprend pas d\u2019alertes, le plan Pro inclut 5 alertes et le plan Enterprise offre des alertes illimitees.',
      },
      {
        title: 'Recevoir les resultats',
        text: 'Lorsqu\u2019une alerte detecte de nouvelles decisions correspondant a vos criteres, vous recevez un email recapitulatif avec les liens directs vers les documents.',
      },
    ],
  },
  {
    id: 'annotations',
    title: 'Annotations',
    content: [
      {
        title: 'Annoter un document',
        text: 'Ouvrez un document et cliquez sur "Ajouter une note" dans le panneau lateral. Saisissez votre annotation et choisissez une couleur pour l\u2019identifier visuellement.',
      },
      {
        title: 'Retrouver ses annotations',
        text: 'La page Annotations centralise toutes vos notes avec le contexte du document source. Cliquez sur une annotation pour acceder directement au document concerne.',
      },
    ],
  },
  {
    id: 'securite',
    title: 'Securite du compte',
    content: [
      {
        title: 'Authentification a deux facteurs (2FA)',
        text: 'Activez la 2FA depuis votre Profil pour securiser votre compte. Scannez le QR code avec une application compatible (Google Authenticator, Authy, Microsoft Authenticator). Conservez precieusement vos 8 codes de secours.',
      },
      {
        title: 'Sessions actives',
        text: 'Depuis les Parametres, consultez la liste de vos sessions actives (appareil, adresse IP, derniere activite). Revoquez une session suspecte en un clic.',
      },
      {
        title: 'Export RGPD',
        text: 'Conformement au RGPD, vous pouvez exporter l\u2019integralite de vos donnees personnelles au format JSON depuis les Parametres, section "Export RGPD".',
      },
    ],
  },
];

export default function DocumentationPage() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.toc}>
          <span className={styles.tocTitle}>Sommaire</span>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
              {s.title}
            </a>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.heading}>Documentation</h1>
        <p className={styles.intro}>
          Guide complet pour tirer le meilleur parti de JURISSO. Consultez
          egalement la{' '}
          <Link href="/api" className={styles.inlineLink}>
            documentation API
          </Link>{' '}
          pour l&apos;integration programmatique.
        </p>

        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.content.map((item) => (
              <div key={item.title} className={styles.block}>
                <h3 className={styles.blockTitle}>{item.title}</h3>
                <p className={styles.blockText}>{item.text}</p>
              </div>
            ))}
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Besoin d&apos;aide ?</h2>
          <p className={styles.blockText}>
            Consultez notre{' '}
            <Link href="/aide" className={styles.inlineLink}>
              centre d&apos;aide
            </Link>{' '}
            ou{' '}
            <Link href="/contact" className={styles.inlineLink}>
              contactez-nous
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
