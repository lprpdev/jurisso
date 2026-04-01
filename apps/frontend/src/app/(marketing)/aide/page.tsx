import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Centre d\u2019aide',
  description: 'Trouvez des reponses a vos questions sur JURISSO.',
};

const FAQ_SECTIONS = [
  {
    title: 'Demarrage',
    items: [
      {
        q: 'Comment creer un compte ?',
        a: 'Cliquez sur "Essai gratuit" en haut de la page, remplissez le formulaire d\u2019inscription et verifiez votre adresse email.',
      },
      {
        q: 'Le plan gratuit est-il vraiment gratuit ?',
        a: 'Oui, le plan gratuit est sans engagement et sans carte bancaire. Il inclut 50 recherches par mois et 5 favoris.',
      },
      {
        q: 'Comment verifier mon adresse email ?',
        a: 'Apres votre inscription, vous recevez un email avec un lien de verification. Cliquez dessus pour activer votre compte.',
      },
    ],
  },
  {
    title: 'Recherche',
    items: [
      {
        q: 'Quelles sources sont disponibles ?',
        a: 'JURISSO indexe les decisions de justice (Judilibre), les textes legislatifs et reglementaires (Legifrance/DILA). Toutes les donnees proviennent de sources officielles sous licence ouverte Etalab 2.0.',
      },
      {
        q: 'Comment affiner mes recherches ?',
        a: 'Utilisez les filtres dans le panneau lateral : type de document, juridiction, matiere, periode, solution. Vous pouvez combiner plusieurs filtres.',
      },
      {
        q: 'Les resultats sont-ils a jour ?',
        a: 'Nos donnees sont synchronisees quotidiennement avec les bases officielles. Un delai de 24 a 48h peut exister pour les toutes dernieres publications.',
      },
    ],
  },
  {
    title: 'Fonctionnalites',
    items: [
      {
        q: 'Comment creer une alerte ?',
        a: 'Depuis la page Alertes, cliquez sur "Nouvelle alerte", definissez vos criteres de recherche et choisissez la frequence (quotidienne ou hebdomadaire).',
      },
      {
        q: 'Comment annoter un document ?',
        a: 'Ouvrez un document, selectionnez du texte dans le corps du texte, puis cliquez sur "Ajouter une note" dans le panneau lateral.',
      },
      {
        q: 'Comment partager une collection ?',
        a: 'Ouvrez votre collection, activez l\u2019option "Publique" dans les parametres de la collection. Vous pouvez ensuite partager le lien.',
      },
    ],
  },
  {
    title: 'Compte et securite',
    items: [
      {
        q: 'Comment activer l\u2019authentification a deux facteurs ?',
        a: 'Rendez-vous dans votre Profil, section "Authentification a deux facteurs". Scannez le QR code avec votre application d\u2019authentification (Google Authenticator, Authy, etc.).',
      },
      {
        q: 'Comment exporter mes donnees ?',
        a: 'Depuis les Parametres, section "Export RGPD", cliquez sur "Exporter mes donnees". Vous recevrez un email avec un lien de telechargement.',
      },
      {
        q: 'Comment supprimer mon compte ?',
        a: 'Depuis votre Profil, section "Zone de danger", cliquez sur "Supprimer mon compte". Cette action est irreversible.',
      },
    ],
  },
];

export default function AidePage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Centre d&apos;aide</h1>
        <p className={styles.subtitle}>
          Trouvez des reponses a vos questions sur JURISSO
        </p>
      </header>

      <div className={styles.sections}>
        {FAQ_SECTIONS.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.items}>
              {section.items.map((item) => (
                <details key={item.q} className={styles.item}>
                  <summary className={styles.question}>{item.q}</summary>
                  <p className={styles.answer}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Vous ne trouvez pas la reponse a votre question ?
        </p>
        <Link href="/contact" className={styles.footerLink}>
          Contactez-nous
        </Link>
      </footer>
    </main>
  );
}
