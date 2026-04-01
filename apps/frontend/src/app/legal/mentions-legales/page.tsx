import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mentions legales',
  description: 'Mentions legales du site JURISSO.',
};

export default function MentionsLegalesPage() {
  return (
    <article>
      <h1 className={styles.heading}>Mentions legales</h1>
      <p className={styles.lastUpdate}>Derniere mise a jour : 1er janvier 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Editeur du site</h2>
        <p className={styles.paragraph}>
          Le site <span className={styles.strong}>jurisso.fr</span> est edite par :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>JURISSO SAS</span>, societe par actions simplifiee au capital de 10 000 euros
          </li>
          <li className={styles.listItem}>
            Siege social : 42 rue de Richelieu, 75001 Paris, France
          </li>
          <li className={styles.listItem}>
            Immatriculee au Registre du Commerce et des Societes de Paris sous le numero 912 345 678
          </li>
          <li className={styles.listItem}>
            Numero de TVA intracommunautaire : FR 12 912345678
          </li>
          <li className={styles.listItem}>
            Directeur de la publication : Alexandre Renault, President
          </li>
          <li className={styles.listItem}>
            Contact : <a href="mailto:contact@jurisso.fr" className={styles.link}>contact@jurisso.fr</a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Hebergement</h2>
        <p className={styles.paragraph}>Le site est heberge par :</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>OVH SAS</span>
          </li>
          <li className={styles.listItem}>
            Siege social : 2 rue Kellermann, 59100 Roubaix, France
          </li>
          <li className={styles.listItem}>
            RCS Lille Metropole 424 761 419 00045
          </li>
          <li className={styles.listItem}>
            Telephone : 1007 (depuis la France)
          </li>
          <li className={styles.listItem}>
            Site web : <a href="https://www.ovh.com" className={styles.link} target="_blank" rel="noopener noreferrer">www.ovh.com</a>
          </li>
        </ul>
        <p className={styles.paragraph}>
          L&apos;ensemble des donnees est heberge en France, sur le territoire metropolitain, conformement aux exigences du RGPD et de la legislation francaise en matiere de protection des donnees personnelles.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Sources des donnees</h2>
        <p className={styles.paragraph}>
          JURISSO agrege et indexe des donnees provenant de sources publiques officielles :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>Legifrance</span> : donnees legislatives et reglementaires diffusees par la Direction de l&apos;information legale et administrative (DILA), sous Licence ouverte Etalab 2.0
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Judilibre</span> : decisions de justice mises a disposition par la Cour de cassation dans le cadre de l&apos;open data judiciaire, conformement au decret n° 2020-797 du 29 juin 2020
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Journal Officiel</span> : publications officielles de la Republique francaise, diffusees par la DILA
          </li>
        </ul>
        <p className={styles.paragraph}>
          JURISSO ne modifie pas le contenu des decisions de justice ni des textes legislatifs. Les operations de pseudonymisation sont realisees par les juridictions elles-memes, conformement a la reglementation en vigueur.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Propriete intellectuelle</h2>
        <p className={styles.paragraph}>
          Les decisions de justice et les textes legislatifs diffuses sur JURISSO ne sont pas couverts par le droit d&apos;auteur, conformement a l&apos;article L. 122-5 du Code de la propriete intellectuelle.
        </p>
        <p className={styles.paragraph}>
          En revanche, la structure, le design, le code source, les fonctionnalites, les algorithmes de recherche et l&apos;ensemble des elements originaux du site JURISSO sont proteges par le droit de la propriete intellectuelle et sont la propriete exclusive de JURISSO SAS.
        </p>
        <p className={styles.paragraph}>
          Toute reproduction, representation, modification, distribution ou exploitation, totale ou partielle, de ces elements est strictement interdite sans autorisation ecrite prealable de JURISSO SAS.
        </p>
        <p className={styles.paragraph}>
          La marque JURISSO, le logo et les elements graphiques associes sont des marques deposees. Leur utilisation sans autorisation est prohibee.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Limitation de responsabilite</h2>
        <p className={styles.paragraph}>
          JURISSO met tout en oeuvre pour assurer l&apos;exactitude et l&apos;exhaustivite des informations diffusees sur le site. Toutefois, JURISSO ne saurait garantir l&apos;absence d&apos;erreurs, d&apos;omissions ou de retard dans la mise a jour des donnees.
        </p>
        <p className={styles.paragraph}>
          Les informations presentees sur le site ont un caractere purement informatif et ne constituent en aucun cas un avis juridique, un conseil ou une consultation. L&apos;utilisateur est invite a consulter un professionnel du droit pour toute question juridique specifique.
        </p>
        <p className={styles.paragraph}>
          JURISSO decline toute responsabilite en cas d&apos;utilisation des informations diffusees sur le site a des fins inappropriees ou en cas de decisions prises sur la base de ces informations.
        </p>
        <p className={styles.paragraph}>
          JURISSO ne saurait etre tenue responsable des interruptions de service, des erreurs techniques ou des dysfonctionnements pouvant affecter l&apos;acces au site ou a ses fonctionnalites.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Liens hypertextes</h2>
        <p className={styles.paragraph}>
          Le site JURISSO peut contenir des liens hypertextes vers des sites tiers. JURISSO n&apos;exerce aucun controle sur le contenu de ces sites et decline toute responsabilite quant a leur contenu ou aux dommages pouvant resulter de leur consultation.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Droit applicable</h2>
        <p className={styles.paragraph}>
          Les presentes mentions legales sont soumises au droit francais. En cas de litige, les tribunaux de Paris sont seuls competents, sauf disposition legale contraire.
        </p>
      </section>
    </article>
  );
}
