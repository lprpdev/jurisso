import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Politique de cookies',
  description:
    'Politique de cookies du site JURISSO : types de cookies utilises, finalites et gestion des preferences.',
};

export default function CookiesPage() {
  return (
    <article>
      <h1 className={styles.heading}>Politique de cookies</h1>
      <p className={styles.lastUpdate}>Derniere mise a jour : 1er janvier 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p className={styles.paragraph}>
          Un cookie est un petit fichier texte depose sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d&apos;un site web. Les cookies permettent au site de memoriser des informations sur votre visite, comme votre langue preferee ou votre session de connexion, afin de faciliter votre navigation.
        </p>
        <p className={styles.paragraph}>
          Les cookies peuvent etre &laquo; de session &raquo; (supprimes a la fermeture du navigateur) ou &laquo; persistants &raquo; (conserves pendant une duree determinee). Ils peuvent etre deposes par le site visite (&laquo; cookies proprietes &raquo;) ou par des tiers (&laquo; cookies tiers &raquo;).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Cookies utilises par JURISSO</h2>
        <p className={styles.paragraph}>
          Le tableau ci-dessous detail l&apos;ensemble des cookies utilises par JURISSO :
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.0625rem', marginTop: '1.5rem' }}>
          2.1 Cookies strictement necessaires
        </h3>
        <p className={styles.paragraph}>
          Ces cookies sont indispensables au fonctionnement du site. Ils ne necessitent pas de consentement.
        </p>
        <table className={styles.cookieTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Domaine</th>
              <th>Duree</th>
              <th>Finalite</th>
              <th>Opt-out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.mono}>jurisso_session</span></td>
              <td>jurisso.fr</td>
              <td>Session</td>
              <td>Maintien de la session authentifiee de l&apos;utilisateur. Contient un identifiant de session chiffre.</td>
              <td>Non (necessaire)</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>jurisso_csrf</span></td>
              <td>jurisso.fr</td>
              <td>Session</td>
              <td>Protection contre les attaques CSRF (Cross-Site Request Forgery). Token unique par session.</td>
              <td>Non (necessaire)</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>jurisso_consent</span></td>
              <td>jurisso.fr</td>
              <td>13 mois</td>
              <td>Memorisation des choix de l&apos;utilisateur concernant les cookies (acceptation/refus par categorie).</td>
              <td>Non (necessaire)</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>jurisso_lang</span></td>
              <td>jurisso.fr</td>
              <td>12 mois</td>
              <td>Memorisation de la langue preferee de l&apos;utilisateur.</td>
              <td>Non (necessaire)</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.0625rem', marginTop: '1.5rem' }}>
          2.2 Cookies fonctionnels
        </h3>
        <p className={styles.paragraph}>
          Ces cookies ameliorent l&apos;experience utilisateur sans etre strictement necessaires.
        </p>
        <table className={styles.cookieTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Domaine</th>
              <th>Duree</th>
              <th>Finalite</th>
              <th>Opt-out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.mono}>jurisso_search_prefs</span></td>
              <td>jurisso.fr</td>
              <td>12 mois</td>
              <td>Memorisation des preferences de recherche (filtres par defaut, nombre de resultats par page).</td>
              <td>Parametres du compte ou banniere cookies</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>jurisso_theme</span></td>
              <td>jurisso.fr</td>
              <td>12 mois</td>
              <td>Preference du theme d&apos;affichage (clair/sombre).</td>
              <td>Parametres du compte ou banniere cookies</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>jurisso_recent</span></td>
              <td>jurisso.fr</td>
              <td>30 jours</td>
              <td>Historique des dernieres recherches effectuees (stockage local).</td>
              <td>Parametres du compte ou banniere cookies</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.0625rem', marginTop: '1.5rem' }}>
          2.3 Cookies de mesure d&apos;audience
        </h3>
        <p className={styles.paragraph}>
          JURISSO utilise Plausible Analytics, une solution de mesure d&apos;audience respectueuse de la vie privee qui ne depose aucun cookie et ne collecte aucune donnee personnelle.
        </p>
        <table className={styles.cookieTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Domaine</th>
              <th>Duree</th>
              <th>Finalite</th>
              <th>Opt-out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><em>Aucun cookie</em></td>
              <td>plausible.io</td>
              <td>—</td>
              <td>Plausible Analytics fonctionne sans cookies. Les statistiques sont anonymes et agregees. Aucune donnee personnelle n&apos;est collectee.</td>
              <td>Non applicable (pas de cookie depose)</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.0625rem', marginTop: '1.5rem' }}>
          2.4 Cookies tiers (paiement)
        </h3>
        <p className={styles.paragraph}>
          Ces cookies sont deposes par notre prestataire de paiement lors du processus de souscription.
        </p>
        <table className={styles.cookieTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Domaine</th>
              <th>Duree</th>
              <th>Finalite</th>
              <th>Opt-out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.mono}>__stripe_mid</span></td>
              <td>stripe.com</td>
              <td>1 an</td>
              <td>Identification de l&apos;appareil pour la detection de fraude lors du paiement.</td>
              <td>Bloquer les cookies tiers dans le navigateur (peut empecher le paiement)</td>
            </tr>
            <tr>
              <td><span className={styles.mono}>__stripe_sid</span></td>
              <td>stripe.com</td>
              <td>30 minutes</td>
              <td>Identification de la session de paiement en cours pour la securite de la transaction.</td>
              <td>Bloquer les cookies tiers dans le navigateur (peut empecher le paiement)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Gestion des cookies</h2>
        <p className={styles.paragraph}>
          Lors de votre premiere visite sur JURISSO, une banniere vous informe de l&apos;utilisation des cookies et vous permet de les accepter ou de les refuser par categorie.
        </p>
        <p className={styles.paragraph}>
          Vous pouvez modifier vos choix a tout moment :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>Via la banniere cookies</span> : accessible a tout moment en cliquant sur le lien &laquo; Gerer les cookies &raquo; present en pied de page
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Via les parametres de votre navigateur</span> : chaque navigateur propose des options pour bloquer, supprimer ou gerer les cookies
          </li>
        </ul>
        <p className={styles.paragraph}>
          Instructions par navigateur :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>Chrome</span> : Parametres &gt; Confidentialite et securite &gt; Cookies et autres donnees de site
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Firefox</span> : Parametres &gt; Vie privee et securite &gt; Cookies et donnees de sites
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Safari</span> : Preferences &gt; Confidentialite &gt; Gerer les donnees de sites web
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Edge</span> : Parametres &gt; Confidentialite, recherche et services &gt; Cookies
          </li>
        </ul>
        <p className={styles.paragraph}>
          Attention : la desactivation de certains cookies peut affecter le fonctionnement du site. Les cookies strictement necessaires ne peuvent pas etre desactives car ils sont indispensables au fonctionnement de base du Service.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Base legale</h2>
        <p className={styles.paragraph}>
          Le depot des cookies strictement necessaires repose sur l&apos;interet legitime de JURISSO au fonctionnement du Service (article 82 de la loi Informatique et Libertes, exemption de consentement).
        </p>
        <p className={styles.paragraph}>
          Le depot des cookies fonctionnels et de mesure d&apos;audience repose sur votre consentement, conformement a l&apos;article 82 de la loi Informatique et Libertes et aux recommandations de la CNIL (deliberation n° 2020-091 du 17 septembre 2020).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Contact</h2>
        <p className={styles.paragraph}>
          Pour toute question relative a notre politique de cookies, vous pouvez contacter notre Delegue a la protection des donnees : <a href="mailto:dpo@jurisso.fr" className={styles.link}>dpo@jurisso.fr</a>.
        </p>
      </section>
    </article>
  );
}
