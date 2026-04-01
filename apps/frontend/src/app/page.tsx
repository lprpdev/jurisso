import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          JURISSO
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/fonctionnalites" className={styles.navLink}>
              Fonctionnalites
            </Link>
          </li>
          <li>
            <Link href="/tarifs" className={styles.navLink}>
              Tarifs
            </Link>
          </li>
          <li>
            <Link href="/a-propos" className={styles.navLink}>
              A propos
            </Link>
          </li>
          <li>
            <Link href="/blog" className={styles.navLink}>
              Blog
            </Link>
          </li>
        </ul>
        <div className={styles.navRight}>
          <Link href="/auth/connexion" className={styles.navLogin}>
            Connexion
          </Link>
          <Link href="/auth/inscription" className={styles.navCta}>
            Essai gratuit
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <h1 className={styles.heroHeadline}>
          La recherche juridique. Reinventee.
        </h1>
        <p className={styles.heroSubtitle}>
          Accedez a 3,2 millions de decisions de justice et 450 000 textes
          legislatifs. Recherche instantanee, alertes intelligentes, annotations
          collaboratives.
        </p>
        <Link href="/auth/inscription" className={styles.heroSearch}>
          <svg
            className={styles.heroSearchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className={styles.heroSearchPlaceholder}>
            Rechercher une decision, un article de loi, un texte...
          </span>
        </Link>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>3,2M+</span>
            <span className={styles.heroStatLabel}>Decisions indexees</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>450K+</span>
            <span className={styles.heroStatLabel}>Textes legislatifs</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>12 000+</span>
            <span className={styles.heroStatLabel}>
              Professionnels du droit
            </span>
          </div>
        </div>
      </section>

      {/* ── Sources ── */}
      <section className={styles.sources}>
        <h2 className={styles.sectionTitle}>
          Sources officielles et verifiees
        </h2>
        <div className={styles.sourcesGrid}>
          <div className={styles.sourceCard}>
            <svg
              className={styles.sourceIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect
                x="4"
                y="6"
                width="32"
                height="28"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M8 10h24M8 16h24M8 22h16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <h3 className={styles.sourceTitle}>Legifrance (DILA)</h3>
            <p className={styles.sourceDesc}>
              L&apos;integralite des codes, lois, decrets et arretes publies au
              Journal officiel. Donnees issues de la Direction de l&apos;information
              legale et administrative.
            </p>
          </div>
          <div className={styles.sourceCard}>
            <svg
              className={styles.sourceIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle
                cx="20"
                cy="20"
                r="14"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M14 20l4 4 8-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className={styles.sourceTitle}>Judilibre (Cour de cassation)</h3>
            <p className={styles.sourceDesc}>
              Les decisions de la Cour de cassation et des cours d&apos;appel en
              open data. Jurisprudence judiciaire exhaustive et actualisee
              quotidiennement.
            </p>
          </div>
          <div className={styles.sourceCard}>
            <svg
              className={styles.sourceIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect
                x="8"
                y="4"
                width="24"
                height="32"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M14 12h12M14 18h12M14 24h8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <h3 className={styles.sourceTitle}>Journal Officiel</h3>
            <p className={styles.sourceDesc}>
              Publication quotidienne des textes normatifs : lois, decrets,
              arretes et avis. Acces direct aux publications officielles de la
              Republique francaise.
            </p>
          </div>
        </div>
        <p className={styles.sourcesNote}>
          Donnees diffusees sous Licence ouverte Etalab 2.0
        </p>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>
          Des outils penses pour les juristes
        </h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCardLarge}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M22 22l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 className={styles.featureTitle}>Recherche plein-texte</h3>
            <p className={styles.featureDesc}>
              Interrogez 3,2 millions de documents en langage naturel. Notre
              moteur de recherche comprend le vocabulaire juridique et propose
              des resultats pertinents en millisecondes.
            </p>
          </div>
          <div className={styles.featureCard}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M4 16l8 8L28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className={styles.featureTitle}>Alertes intelligentes</h3>
            <p className={styles.featureDesc}>
              Soyez notifie des qu&apos;une nouvelle decision correspond a vos
              criteres de veille juridique.
            </p>
          </div>
          <div className={styles.featureCard}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M6 6h20v20H6z" stroke="currentColor" strokeWidth="2" />
              <path d="M10 14h12M10 18h8" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.featureTitle}>Annotations</h3>
            <p className={styles.featureDesc}>
              Surlignez, annotez et organisez vos lectures directement dans
              l&apos;interface.
            </p>
          </div>
          <div className={styles.featureCardLarge}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M8 4v24M24 4v24M8 12h16M8 20h16" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.featureTitle}>Jurisprudence connectee</h3>
            <p className={styles.featureDesc}>
              Visualisez les liens entre decisions citees et citantes. Explorez
              le reseau de la jurisprudence et identifiez les revirements.
            </p>
          </div>
          <div className={styles.featureCard}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="2" />
              <rect x="18" y="4" width="10" height="10" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="18" width="10" height="10" stroke="currentColor" strokeWidth="2" />
              <rect x="18" y="18" width="10" height="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.featureTitle}>Collections</h3>
            <p className={styles.featureDesc}>
              Constituez des dossiers thematiques partages avec votre equipe.
            </p>
          </div>
          <div className={styles.featureCard}>
            <svg
              className={styles.featureIcon}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M6 26V6h14l6 6v14H6z" stroke="currentColor" strokeWidth="2" />
              <path d="M20 6v6h6" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.featureTitle}>Export professionnel</h3>
            <p className={styles.featureDesc}>
              Exportez vos recherches au format PDF, pret pour inclusion dans
              vos conclusions ou memoires.
            </p>
          </div>
        </div>
      </section>

      {/* ── Personas ── */}
      <section className={styles.personas}>
        <h2 className={styles.sectionTitle}>Qui utilise JURISSO ?</h2>
        <div className={styles.personasGrid}>
          <div className={styles.personaCard}>
            <svg
              className={styles.personaIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M6 36c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.personaTitle}>Avocats</h3>
            <p className={styles.personaDesc}>
              Retrouvez instantanement la jurisprudence pertinente pour vos
              dossiers. Constituez des collections thematiques et recevez des
              alertes sur les decisions de vos juridictions.
            </p>
          </div>
          <div className={styles.personaCard}>
            <svg
              className={styles.personaIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect x="6" y="8" width="28" height="24" stroke="currentColor" strokeWidth="2" />
              <path d="M14 8V4h12v4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.personaTitle}>Juristes d&apos;entreprise</h3>
            <p className={styles.personaDesc}>
              Assurez votre veille reglementaire et suivez l&apos;evolution de la
              legislation dans votre secteur. Partagez vos recherches avec vos
              collegues via les collections collaboratives.
            </p>
          </div>
          <div className={styles.personaCard}>
            <svg
              className={styles.personaIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.personaTitle}>Chercheurs</h3>
            <p className={styles.personaDesc}>
              Explorez le corpus jurisprudentiel francais pour vos travaux de
              recherche. Annotez les decisions, visualisez les liens entre les
              arrets et exportez vos resultats.
            </p>
          </div>
          <div className={styles.personaCard}>
            <svg
              className={styles.personaIcon}
              viewBox="0 0 40 40"
              fill="none"
            >
              <path d="M8 36V8l12-4 12 4v28l-12-4-12 4z" stroke="currentColor" strokeWidth="2" />
              <path d="M20 4v28" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className={styles.personaTitle}>Etudiants</h3>
            <p className={styles.personaDesc}>
              Preparez vos examens et memoires avec un acces gratuit a
              l&apos;ensemble de la jurisprudence. Creez des fiches de revision et
              annotez les decisions fondamentales.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className={styles.pricing}>
        <h2 className={styles.sectionTitleWhite}>
          Des tarifs simples et transparents
        </h2>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <p className={styles.pricingName}>Gratuit</p>
            <p className={styles.pricingPrice}>0 &euro;</p>
            <p className={styles.pricingPeriod}>pour toujours</p>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>50 recherches / mois</li>
              <li className={styles.pricingFeature}>5 favoris</li>
              <li className={styles.pricingFeature}>Acces decisions completes</li>
            </ul>
          </div>
          <div className={styles.pricingCardFeatured}>
            <p className={styles.pricingName}>Pro</p>
            <p className={styles.pricingPrice}>19 &euro;</p>
            <p className={styles.pricingPeriod}>par mois</p>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>Recherches illimitees</li>
              <li className={styles.pricingFeature}>Favoris illimites</li>
              <li className={styles.pricingFeature}>5 alertes intelligentes</li>
              <li className={styles.pricingFeature}>Annotations et collections</li>
              <li className={styles.pricingFeature}>Export PDF</li>
            </ul>
          </div>
          <div className={styles.pricingCard}>
            <p className={styles.pricingName}>Enterprise</p>
            <p className={styles.pricingPrice}>Sur devis</p>
            <p className={styles.pricingPeriod}>facturation annuelle</p>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>Tout le plan Pro</li>
              <li className={styles.pricingFeature}>Alertes illimitees</li>
              <li className={styles.pricingFeature}>API dediee</li>
              <li className={styles.pricingFeature}>SSO / SAML</li>
              <li className={styles.pricingFeature}>Support dedie</li>
            </ul>
          </div>
        </div>
        <Link href="/tarifs" className={styles.pricingMore}>
          Voir tous les details &rarr;
        </Link>
      </section>

      {/* ── Testimonials ── */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>Ils nous font confiance</h2>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <blockquote className={styles.testimonialQuote}>
              JURISSO a transforme ma pratique quotidienne. Je trouve en
              30 secondes ce qui me prenait 2 heures.
            </blockquote>
            <p className={styles.testimonialAuthor}>Me. Sophie Laurent</p>
            <p className={styles.testimonialRole}>
              Avocate au Barreau de Paris
            </p>
          </div>
          <div className={styles.testimonialCard}>
            <blockquote className={styles.testimonialQuote}>
              Un outil indispensable pour mes travaux de recherche en droit
              compare.
            </blockquote>
            <p className={styles.testimonialAuthor}>Dr. Marc Dubois</p>
            <p className={styles.testimonialRole}>
              Maitre de conferences, Paris II
            </p>
          </div>
          <div className={styles.testimonialCard}>
            <blockquote className={styles.testimonialQuote}>
              Depuis que notre equipe utilise JURISSO, notre productivite sur
              les dossiers contentieux a double.
            </blockquote>
            <p className={styles.testimonialAuthor}>
              Cabinet Moreau &amp; Associes
            </p>
            <p className={styles.testimonialRole}>
              Cabinet d&apos;avocats, Lyon
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaHeadline}>Commencez gratuitement</h2>
        <p className={styles.ctaSubtitle}>
          Aucune carte bancaire requise. 50 recherches offertes.
        </p>
        <Link href="/auth/inscription" className={styles.ctaButton}>
          Creer mon compte
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <h4 className={styles.footerHeading}>Produit</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/fonctionnalites" className={styles.footerLink}>
                  Fonctionnalites
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className={styles.footerLink}>
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/demo" className={styles.footerLink}>
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Ressources</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/blog" className={styles.footerLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/documentation" className={styles.footerLink}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className={styles.footerLink}>
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/legal/mentions-legales" className={styles.footerLink}>
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/politique-confidentialite"
                  className={styles.footerLink}
                >
                  Confidentialite
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-generales-utilisation"
                  className={styles.footerLink}
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-generales-vente"
                  className={styles.footerLink}
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className={styles.footerLink}>
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a
                  href="mailto:contact@jurisso.fr"
                  className={styles.footerLink}
                >
                  contact@jurisso.fr
                </a>
              </li>
              <li>
                <span className={styles.footerLink}>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            &copy; 2025 JURISSO SAS. Tous droits reserves.
          </p>
        </div>
      </footer>
    </>
  );
}
