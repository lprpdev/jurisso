import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Decouvrez les tarifs JURISSO : plan gratuit, Pro a 19 euros/mois et Enterprise sur devis. Sans engagement.',
};

export default function TarifsPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Des tarifs simples et transparents</h1>
        <p className={styles.heroSubtitle}>
          Choisissez le plan adapte a votre pratique. Sans engagement, resiliable a tout moment.
        </p>
      </section>

      {/* Toggle */}
      <div className={styles.toggle}>
        <span className={styles.toggleLabelActive}>Mensuel</span>
        <div className={styles.toggleTrack}>
          <div className={styles.toggleKnob} />
        </div>
        <span className={styles.toggleLabel}>
          Annuel <span className={styles.toggleBadge}>-17%</span>
        </span>
      </div>

      {/* Plans */}
      <section className={styles.plans}>
        <div className={styles.plansGrid}>
          {/* Gratuit */}
          <div className={styles.planCard}>
            <p className={styles.planName}>Gratuit</p>
            <p className={styles.planPrice}>
              0 &euro;
            </p>
            <p className={styles.planPeriod}>pour toujours</p>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}>50 recherches par mois</li>
              <li className={styles.planFeature}>5 favoris</li>
              <li className={styles.planFeature}>Acces aux decisions completes</li>
              <li className={styles.planFeatureDisabled}>Pas d&apos;alertes</li>
              <li className={styles.planFeatureDisabled}>Pas d&apos;annotations</li>
              <li className={styles.planFeatureDisabled}>Pas d&apos;export PDF</li>
            </ul>
            <Link href="/auth/inscription" className={styles.planCta}>
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro */}
          <div className={styles.planCardFeatured}>
            <span className={styles.planBadge}>Le plus populaire</span>
            <p className={styles.planName}>Pro</p>
            <p className={styles.planPrice}>
              19 &euro;<span className={styles.planPriceSuffix}> / mois</span>
            </p>
            <p className={styles.planPeriod}>ou 190 &euro; / an (soit 15,83 &euro; / mois)</p>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}>Recherches illimitees</li>
              <li className={styles.planFeature}>Favoris illimites</li>
              <li className={styles.planFeature}>5 alertes intelligentes</li>
              <li className={styles.planFeature}>Annotations et surlignage</li>
              <li className={styles.planFeature}>Collections partagees</li>
              <li className={styles.planFeature}>Export PDF professionnel</li>
              <li className={styles.planFeature}>Historique 1 an</li>
            </ul>
            <Link href="/auth/inscription" className={styles.planCtaAccent}>
              Demarrer l&apos;essai gratuit
            </Link>
          </div>

          {/* Enterprise */}
          <div className={styles.planCard}>
            <p className={styles.planName}>Enterprise</p>
            <p className={styles.planPrice}>Sur devis</p>
            <p className={styles.planPeriod}>facturation annuelle</p>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}>Tout le plan Pro inclus</li>
              <li className={styles.planFeature}>Alertes illimitees</li>
              <li className={styles.planFeature}>API dediee</li>
              <li className={styles.planFeature}>SSO / SAML</li>
              <li className={styles.planFeature}>Support dedie prioritaire</li>
              <li className={styles.planFeature}>Multi-comptes et gestion equipe</li>
              <li className={styles.planFeature}>SLA garanti</li>
            </ul>
            <Link href="/contact" className={styles.planCta}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={styles.comparison}>
        <h2 className={styles.comparisonTitle}>Comparaison detaillee</h2>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Fonctionnalite</th>
              <th>Gratuit</th>
              <th>Pro</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Recherches</td>
              <td>50 / mois</td>
              <td>Illimitees</td>
              <td>Illimitees</td>
            </tr>
            <tr>
              <td>Favoris</td>
              <td>5</td>
              <td>Illimites</td>
              <td>Illimites</td>
            </tr>
            <tr>
              <td>Alertes</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td>5</td>
              <td>Illimitees</td>
            </tr>
            <tr>
              <td>Annotations</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>Collections partagees</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>Export PDF</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>Jurisprudence connectee</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>Historique</td>
              <td>7 jours</td>
              <td>1 an</td>
              <td>Illimite</td>
            </tr>
            <tr>
              <td>API dediee</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>SSO / SAML</td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.crossMark}>&mdash;</span></td>
              <td><span className={styles.checkMark}>Oui</span></td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Email</td>
              <td>Email prioritaire</td>
              <td>Dedie + SLA</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>Questions frequentes</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Puis-je essayer gratuitement ?</h3>
            <p className={styles.faqAnswer}>
              Oui. Le plan Gratuit vous offre 50 recherches par mois sans aucune
              carte bancaire requise. Vous pouvez l&apos;utiliser aussi longtemps que
              vous le souhaitez.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Comment fonctionne la facturation ?</h3>
            <p className={styles.faqAnswer}>
              La facturation est mensuelle, securisee par Stripe. Vous pouvez
              resilier a tout moment depuis les parametres de votre compte. Le
              service reste actif jusqu&apos;a la fin de la periode payee.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Les prix sont-ils HT ou TTC ?</h3>
            <p className={styles.faqAnswer}>
              Les prix affiches sont hors taxes (HT). La TVA de 20 % s&apos;applique
              en sus pour les clients residant en France metropolitaine.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Puis-je changer de plan ?</h3>
            <p className={styles.faqAnswer}>
              Oui, vous pouvez passer du plan Gratuit au plan Pro ou inversement
              a tout moment. Le changement prend effet immediatement et la
              facturation est ajustee au prorata.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Y a-t-il un engagement ?</h3>
            <p className={styles.faqAnswer}>
              Non, tous nos plans sont sans engagement. Vous pouvez resilier a
              tout moment. Pour le plan annuel, vous beneficiez d&apos;une reduction
              de 17 % mais vous pouvez demander un remboursement sous 30 jours.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Comment resilier ?</h3>
            <p className={styles.faqAnswer}>
              Depuis les parametres de votre compte, section &laquo; Abonnement &raquo;.
              La resiliation est immediate et vous conservez l&apos;acces jusqu&apos;a la
              fin de la periode en cours.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Proposez-vous des tarifs education ?</h3>
            <p className={styles.faqAnswer}>
              Oui, nous proposons des tarifs preferentiels pour les universites,
              ecoles et organismes de formation. Contactez-nous a
              education@jurisso.fr avec votre justificatif.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Les donnees sont-elles securisees ?</h3>
            <p className={styles.faqAnswer}>
              Toutes les donnees sont chiffrees en transit (TLS 1.3) et au repos
              (AES-256). Notre infrastructure est hebergee en France chez OVH,
              conforme au RGPD.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
