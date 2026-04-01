import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Politique de confidentialite',
  description:
    'Politique de confidentialite et de protection des donnees personnelles de JURISSO, conforme au RGPD.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <article>
      <h1 className={styles.heading}>Politique de confidentialite</h1>
      <p className={styles.lastUpdate}>Derniere mise a jour : 1er janvier 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Responsable du traitement</h2>
        <p className={styles.paragraph}>
          Le responsable du traitement des donnees personnelles collectees via le site jurisso.fr est :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>JURISSO SAS</span>, 42 rue de Richelieu, 75001 Paris
          </li>
          <li className={styles.listItem}>
            RCS Paris 912 345 678
          </li>
          <li className={styles.listItem}>
            Contact : <a href="mailto:dpo@jurisso.fr" className={styles.link}>dpo@jurisso.fr</a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Delegue a la protection des donnees (DPO)</h2>
        <p className={styles.paragraph}>
          JURISSO a designe un Delegue a la protection des donnees, joignable a l&apos;adresse suivante :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Email : <a href="mailto:dpo@jurisso.fr" className={styles.link}>dpo@jurisso.fr</a>
          </li>
          <li className={styles.listItem}>
            Adresse postale : DPO JURISSO, 42 rue de Richelieu, 75001 Paris
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Donnees collectees</h2>
        <p className={styles.paragraph}>
          JURISSO collecte les categories de donnees suivantes :
        </p>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Categorie</th>
              <th>Donnees</th>
              <th>Finalite</th>
              <th>Base legale</th>
              <th>Duree</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identite</td>
              <td>Nom, prenom, email</td>
              <td>Creation et gestion du compte</td>
              <td>Execution du contrat</td>
              <td>Duree du compte + 3 ans</td>
            </tr>
            <tr>
              <td>Connexion</td>
              <td>Adresse IP, user-agent, date et heure</td>
              <td>Securite, statistiques</td>
              <td>Interet legitime</td>
              <td>12 mois</td>
            </tr>
            <tr>
              <td>Utilisation</td>
              <td>Recherches, favoris, annotations, alertes</td>
              <td>Fourniture du service</td>
              <td>Execution du contrat</td>
              <td>Duree du compte</td>
            </tr>
            <tr>
              <td>Facturation</td>
              <td>Adresse de facturation, historique des paiements</td>
              <td>Facturation, comptabilite</td>
              <td>Obligation legale</td>
              <td>10 ans (obligation comptable)</td>
            </tr>
            <tr>
              <td>Communication</td>
              <td>Messages du formulaire de contact</td>
              <td>Reponse aux demandes</td>
              <td>Interet legitime</td>
              <td>3 ans</td>
            </tr>
            <tr>
              <td>Cookies</td>
              <td>Identifiants techniques, preferences</td>
              <td>Fonctionnement, mesure d&apos;audience</td>
              <td>Consentement / Interet legitime</td>
              <td>13 mois maximum</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Sous-traitants</h2>
        <p className={styles.paragraph}>
          JURISSO fait appel aux sous-traitants suivants pour le traitement des donnees :
        </p>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Sous-traitant</th>
              <th>Fonction</th>
              <th>Localisation</th>
              <th>Garanties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OVH SAS</td>
              <td>Hebergement infrastructure</td>
              <td>France</td>
              <td>ISO 27001, SOC 2</td>
            </tr>
            <tr>
              <td>Stripe, Inc.</td>
              <td>Traitement des paiements</td>
              <td>UE (Irlande)</td>
              <td>PCI-DSS niveau 1, clauses contractuelles types</td>
            </tr>
            <tr>
              <td>Brevo (ex-Sendinblue)</td>
              <td>Envoi d&apos;emails transactionnels et alertes</td>
              <td>France</td>
              <td>ISO 27001</td>
            </tr>
            <tr>
              <td>Plausible Analytics</td>
              <td>Mesure d&apos;audience (sans cookies)</td>
              <td>UE (Estonie)</td>
              <td>Conforme RGPD, pas de donnees personnelles</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.paragraph}>
          Aucune donnee personnelle n&apos;est transferee en dehors de l&apos;Union europeenne. Tous les sous-traitants sont lies par des clauses contractuelles conformes a l&apos;article 28 du RGPD.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Vos droits</h2>
        <p className={styles.paragraph}>
          Conformement au Reglement general sur la protection des donnees (RGPD) et a la loi Informatique et Libertes, vous disposez des droits suivants :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit d&apos;acces</span> : obtenir la confirmation que des donnees vous concernant sont traitees et en obtenir une copie (article 15 RGPD)
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit de rectification</span> : demander la correction de donnees inexactes ou incompletes (article 16 RGPD)
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit a l&apos;effacement</span> : demander la suppression de vos donnees dans les conditions prevues par l&apos;article 17 du RGPD
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit a la limitation</span> : demander la limitation du traitement dans les cas prevus par l&apos;article 18 du RGPD
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit a la portabilite</span> : recevoir vos donnees dans un format structure et couramment utilise (article 20 RGPD)
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Droit d&apos;opposition</span> : vous opposer au traitement de vos donnees pour des motifs legitimes (article 21 RGPD)
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Directives post-mortem</span> : definir des directives relatives au sort de vos donnees apres votre deces
          </li>
        </ul>
        <p className={styles.paragraph}>
          Pour exercer ces droits, adressez votre demande accompagnee d&apos;un justificatif d&apos;identite a :
          <a href="mailto:dpo@jurisso.fr" className={styles.link}> dpo@jurisso.fr</a>. Nous nous engageons a repondre dans un delai d&apos;un mois.
        </p>
        <p className={styles.paragraph}>
          En cas de difficulte, vous pouvez introduire une reclamation aupres de la Commission nationale de l&apos;informatique et des libertes (CNIL) : <a href="https://www.cnil.fr" className={styles.link} target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Securite</h2>
        <p className={styles.paragraph}>
          JURISSO met en oeuvre les mesures techniques et organisationnelles appropriees pour assurer la securite et la confidentialite des donnees personnelles :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Chiffrement des donnees en transit (TLS 1.3) et au repos (AES-256)</li>
          <li className={styles.listItem}>Authentification a deux facteurs disponible pour tous les comptes</li>
          <li className={styles.listItem}>Sauvegardes chiffrees quotidiennes</li>
          <li className={styles.listItem}>Controle d&apos;acces strict aux donnees (principe du moindre privilege)</li>
          <li className={styles.listItem}>Journalisation des acces et des operations sensibles</li>
          <li className={styles.listItem}>Tests de penetration annuels par un prestataire independant</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Cookies</h2>
        <p className={styles.paragraph}>
          Pour la politique detaillee relative aux cookies, consultez notre{' '}
          <a href="/legal/cookies" className={styles.link}>politique de cookies</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Modification de la politique</h2>
        <p className={styles.paragraph}>
          JURISSO se reserve le droit de modifier la presente politique de confidentialite a tout moment. Les modifications entreront en vigueur des leur publication sur le site. Les utilisateurs seront informes par email en cas de modification substantielle.
        </p>
      </section>
    </article>
  );
}
