import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'equipe JURISSO. Nous repondons sous 24 heures.',
};

async function handleContact(formData: FormData) {
  'use server';
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // TODO: Send email or store in database
  console.log('Contact form submission:', { name, email, subject, message });
}

export default function ContactPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Contactez-nous</h1>
        <p className={styles.heroSubtitle}>
          Une question, une demande de demo ou un besoin specifique ? Nous vous repondons sous 24 heures.
        </p>
      </section>

      {/* Main */}
      <div className={styles.main}>
        <form action={handleContact} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Nom complet
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={styles.input}
              placeholder="Votre nom"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
              placeholder="votre@email.fr"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="subject" className={styles.label}>
              Sujet
            </label>
            <select id="subject" name="subject" required className={styles.select}>
              <option value="">Selectionnez un sujet</option>
              <option value="demo">Demande de demonstration</option>
              <option value="commercial">Question commerciale</option>
              <option value="technique">Support technique</option>
              <option value="partenariat">Partenariat</option>
              <option value="presse">Presse</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className={styles.textarea}
              placeholder="Decrivez votre demande..."
            />
          </div>
          <button type="submit" className={styles.submit}>
            Envoyer le message
          </button>
        </form>

        <aside className={styles.side}>
          <div className={styles.sideSection}>
            <h3 className={styles.sideTitle}>Coordonnees</h3>
            <p className={styles.sideText}>JURISSO SAS</p>
            <p className={styles.sideText}>42 rue de Richelieu</p>
            <p className={styles.sideText}>75001 Paris, France</p>
            <p className={styles.sideText}>
              <a href="mailto:contact@jurisso.fr" className={styles.sideLink}>
                contact@jurisso.fr
              </a>
            </p>
          </div>
          <div className={styles.sideSection}>
            <h3 className={styles.sideTitle}>FAQ</h3>
            <p className={styles.sideText}>
              Consultez notre{' '}
              <Link href="/tarifs" className={styles.sideLink}>
                FAQ tarifs
              </Link>{' '}
              pour les questions sur les abonnements.
            </p>
          </div>
          <div className={styles.sideSection}>
            <h3 className={styles.sideTitle}>Support</h3>
            <p className={styles.sideText}>
              Clients existants : connectez-vous a votre compte pour acceder au
              support prioritaire.
            </p>
            <p className={styles.sideText}>
              <a href="mailto:support@jurisso.fr" className={styles.sideLink}>
                support@jurisso.fr
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
