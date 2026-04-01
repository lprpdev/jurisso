import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'A propos',
  description:
    'Decouvrez l\'equipe et la mission de JURISSO : democratiser l\'acces a l\'information juridique en France.',
};

const team = [
  {
    name: 'Alexandre Renault',
    role: 'CEO & Co-fondateur',
    bio: 'Ancien avocat au Barreau de Paris, 12 ans d\'experience en droit des affaires. Diplome de Sciences Po et de l\'EFB.',
  },
  {
    name: 'Camille Durand',
    role: 'CTO & Co-fondatrice',
    bio: 'Ingenieure Polytechnique, ex-Google. Specialiste en moteurs de recherche et traitement du langage naturel.',
  },
  {
    name: 'Thomas Bernard',
    role: 'Head of Product',
    bio: 'Designer produit chez LegalTech pendant 8 ans. Passionne par l\'experience utilisateur dans le domaine juridique.',
  },
  {
    name: 'Marie Chen',
    role: 'Head of Data',
    bio: 'Docteure en informatique, Paris-Saclay. Experte en indexation et en fouille de donnees textuelles a grande echelle.',
  },
];

const values = [
  {
    title: 'Transparence',
    desc: 'Nos sources sont publiques, nos tarifs sont clairs. Nous croyons que l\'information juridique doit etre accessible a tous.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    title: 'Rigueur',
    desc: 'Chaque decision et chaque texte est indexe avec precision. Nos donnees proviennent exclusivement de sources officielles.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04',
  },
  {
    title: 'Innovation',
    desc: 'Nous repoussons les limites de la recherche juridique grace au traitement du langage naturel et aux graphes de connaissances.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Souverainete',
    desc: 'Infrastructure hebergee en France, donnees conformes au RGPD. La souverainete numerique au service du droit.',
    icon: 'M3 21V3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18',
  },
];

export default function AProposPage() {
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

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Notre mission</h1>
        <p className={styles.heroSubtitle}>
          Democratiser l&apos;acces a l&apos;information juridique en France.
        </p>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className={styles.missionInner}>
          <h2 className={styles.missionTitle}>Pourquoi JURISSO ?</h2>
          <p className={styles.missionText}>
            En France, l&apos;acces a la jurisprudence et aux textes legislatifs est
            un droit fondamental. Pourtant, les outils existants sont souvent
            complexes, couteux ou inadaptes aux besoins reels des professionnels
            du droit.
          </p>
          <p className={styles.missionText}>
            JURISSO est ne de ce constat. Nous avons cree une plateforme qui
            rend la recherche juridique aussi simple qu&apos;une recherche sur
            internet, tout en offrant la precision et la fiabilite qu&apos;exigent
            les professionnels.
          </p>
          <p className={styles.missionText}>
            Notre ambition : devenir la reference de la recherche juridique en
            France, en combinant la puissance des technologies de pointe avec
            l&apos;expertise du monde juridique.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>Nos valeurs</h2>
        <div className={styles.valuesGrid}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={v.icon} />
              </svg>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>L&apos;equipe</h2>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <svg className={styles.teamAvatarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                </svg>
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
              <p className={styles.teamBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className={styles.press}>
        <h2 className={styles.sectionTitle}>Ils parlent de nous</h2>
        <div className={styles.pressLogos}>
          <span className={styles.pressLogo}>Le Monde du Droit</span>
          <span className={styles.pressLogo}>Dalloz Actualite</span>
          <span className={styles.pressLogo}>Legal Tech News</span>
          <span className={styles.pressLogo}>Les Echos</span>
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
