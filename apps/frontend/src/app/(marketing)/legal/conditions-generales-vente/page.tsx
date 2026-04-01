import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Conditions generales de vente',
  description: 'Conditions generales de vente des abonnements JURISSO.',
};

export default function CGVPage() {
  return (
    <article>
      <h1 className={styles.heading}>Conditions generales de vente</h1>
      <p className={styles.lastUpdate}>Derniere mise a jour : 1er janvier 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 1 — Offres et tarifs</h2>
        <p className={styles.paragraph}>
          JURISSO propose les offres d&apos;abonnement suivantes :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>Plan Gratuit</span> : acces limite a 50 recherches par mois, 5 favoris, sans engagement ni paiement. Ce plan est accessible sans limite de duree.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Plan Pro</span> : 19 euros HT par mois en formule mensuelle, ou 190 euros HT par an en formule annuelle (soit 15,83 euros HT par mois). Comprend les recherches illimitees, les favoris illimites, 5 alertes, les annotations, les collections, l&apos;export PDF et l&apos;historique de 1 an.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Plan Enterprise</span> : tarif sur devis, facturation annuelle. Comprend toutes les fonctionnalites du plan Pro ainsi que les alertes illimitees, l&apos;API dediee, le SSO/SAML, le support dedie et la gestion multi-comptes.
          </li>
        </ul>
        <p className={styles.paragraph}>
          Les prix sont indiques en euros hors taxes (HT). La TVA de 20 % s&apos;applique en sus pour les clients etablis en France metropolitaine. Les clients professionnels etablis dans un autre Etat membre de l&apos;UE et disposant d&apos;un numero de TVA intracommunautaire valide sont exoneres de TVA (autoliquidation).
        </p>
        <p className={styles.paragraph}>
          JURISSO se reserve le droit de modifier ses tarifs a tout moment. Les modifications de tarifs n&apos;affectent pas les abonnements en cours et prennent effet au prochain renouvellement. L&apos;Utilisateur est informe par email au moins 30 jours avant l&apos;application des nouveaux tarifs.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 2 — Commande et paiement</h2>
        <p className={styles.paragraph}>
          La souscription a un plan payant s&apos;effectue en ligne depuis le site jurisso.fr. L&apos;Utilisateur selectionne le plan souhaite, renseigne ses informations de facturation et procede au paiement.
        </p>
        <p className={styles.paragraph}>
          Le paiement est effectue par carte bancaire via notre prestataire de paiement securise Stripe. Les moyens de paiement acceptes sont : Visa, Mastercard, American Express. Pour le plan Enterprise, le paiement par virement bancaire est egalement accepte.
        </p>
        <p className={styles.paragraph}>
          La commande est confirmee par l&apos;envoi d&apos;un email de confirmation contenant le recapitulatif de l&apos;abonnement et la facture au format PDF. L&apos;acces aux fonctionnalites du plan souscrit est active immediatement apres confirmation du paiement.
        </p>
        <p className={styles.paragraph}>
          En cas de formule mensuelle, le paiement est preleve automatiquement chaque mois a la date anniversaire de la souscription. En cas de formule annuelle, le paiement est preleve en une seule fois pour l&apos;annee entiere.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 3 — Droit de retractation</h2>
        <p className={styles.paragraph}>
          Conformement aux articles L. 221-18 et suivants du Code de la consommation, l&apos;Utilisateur consommateur dispose d&apos;un droit de retractation de 14 jours a compter de la souscription de l&apos;abonnement.
        </p>
        <p className={styles.paragraph}>
          Toutefois, conformement a l&apos;article L. 221-28 du Code de la consommation, le droit de retractation ne peut etre exerce si le Service a ete pleinement execute avant la fin du delai de retractation et si l&apos;execution a commence avec l&apos;accord prealable et expres de l&apos;Utilisateur.
        </p>
        <p className={styles.paragraph}>
          Lors de la souscription, l&apos;Utilisateur est informe et accepte expressement que l&apos;execution du Service commence immediatement. En consequence, l&apos;Utilisateur reconnait perdre son droit de retractation une fois le Service pleinement execute.
        </p>
        <p className={styles.paragraph}>
          Pour exercer son droit de retractation dans le delai imparti, l&apos;Utilisateur adresse sa demande par email a <a href="mailto:facturation@jurisso.fr" className={styles.link}>facturation@jurisso.fr</a>. Le remboursement est effectue dans un delai de 14 jours suivant la reception de la demande, par le meme moyen de paiement que celui utilise pour la souscription.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 4 — Resiliation</h2>
        <p className={styles.paragraph}>
          L&apos;Utilisateur peut resilier son abonnement a tout moment depuis les parametres de son compte, rubrique &laquo; Abonnement &raquo;. La resiliation prend effet a la fin de la periode d&apos;abonnement en cours (mois ou annee).
        </p>
        <p className={styles.paragraph}>
          En cas de resiliation, l&apos;Utilisateur conserve l&apos;acces aux fonctionnalites de son plan jusqu&apos;a la fin de la periode payee. A l&apos;issue de cette periode, le compte bascule automatiquement sur le plan Gratuit.
        </p>
        <p className={styles.paragraph}>
          Pour le plan annuel, en cas de resiliation dans les 30 premiers jours suivant la souscription, JURISSO procede au remboursement integrale. Au-dela de 30 jours, aucun remboursement au prorata n&apos;est effectue.
        </p>
        <p className={styles.paragraph}>
          JURISSO peut resilier l&apos;abonnement d&apos;un Utilisateur en cas de manquement grave aux CGU ou aux presentes CGV, apres mise en demeure restee infructueuse pendant 15 jours. Dans ce cas, aucun remboursement n&apos;est du.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 5 — Facturation et factures</h2>
        <p className={styles.paragraph}>
          JURISSO emet une facture a chaque prelevement. Les factures sont disponibles dans l&apos;espace &laquo; Mon compte &raquo; de l&apos;Utilisateur et sont egalement envoyees par email au format PDF.
        </p>
        <p className={styles.paragraph}>
          Les factures mentionnent les informations obligatoires prevues par la reglementation francaise, notamment : l&apos;identite du vendeur et de l&apos;acheteur, la designation du service, le montant HT, le taux et le montant de la TVA, le montant TTC.
        </p>
        <p className={styles.paragraph}>
          En cas de retard de paiement, des penalites de retard egales a trois fois le taux d&apos;interet legal sont applicables de plein droit, sans mise en demeure prealable. Une indemnite forfaitaire de 40 euros pour frais de recouvrement est egalement due conformement a l&apos;article D. 441-5 du Code de commerce.
        </p>
        <p className={styles.paragraph}>
          Pour toute question relative a la facturation : <a href="mailto:facturation@jurisso.fr" className={styles.link}>facturation@jurisso.fr</a>.
        </p>
      </section>
    </article>
  );
}
