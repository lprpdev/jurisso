import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Conditions generales d\'utilisation',
  description: 'Conditions generales d\'utilisation du service JURISSO.',
};

export default function CGUPage() {
  return (
    <article>
      <h1 className={styles.heading}>Conditions generales d&apos;utilisation</h1>
      <p className={styles.lastUpdate}>Derniere mise a jour : 1er janvier 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 1 — Definitions</h2>
        <p className={styles.paragraph}>
          Dans les presentes Conditions generales d&apos;utilisation (ci-apres &laquo; CGU &raquo;), les termes suivants ont la signification qui leur est attribuee ci-dessous :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.strong}>JURISSO</span> : designe la societe JURISSO SAS, editrice du Service.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Service</span> : designe la plateforme de recherche juridique accessible a l&apos;adresse jurisso.fr et l&apos;ensemble de ses fonctionnalites.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Utilisateur</span> : designe toute personne physique ou morale qui accede au Service et cree un compte.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Contenu</span> : designe l&apos;ensemble des decisions de justice, textes legislatifs et reglementaires diffuses via le Service.
          </li>
          <li className={styles.listItem}>
            <span className={styles.strong}>Compte</span> : designe l&apos;espace personnel de l&apos;Utilisateur, accessible apres authentification.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 2 — Objet</h2>
        <p className={styles.paragraph}>
          Les presentes CGU ont pour objet de definir les conditions d&apos;acces et d&apos;utilisation du Service. L&apos;utilisation du Service implique l&apos;acceptation pleine et entiere des presentes CGU. JURISSO se reserve le droit de modifier les CGU a tout moment. Les modifications entrent en vigueur des leur publication sur le site.
        </p>
        <p className={styles.paragraph}>
          L&apos;Utilisateur est invite a consulter regulierement les CGU. En cas de modification substantielle, JURISSO informera les Utilisateurs par email au moins 30 jours avant l&apos;entree en vigueur des nouvelles conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 3 — Inscription et compte</h2>
        <p className={styles.paragraph}>
          L&apos;acces au Service necessite la creation d&apos;un compte. L&apos;Utilisateur s&apos;engage a fournir des informations exactes, completes et a jour lors de son inscription. Il est responsable de la confidentialite de ses identifiants de connexion.
        </p>
        <p className={styles.paragraph}>
          L&apos;Utilisateur s&apos;engage a notifier immediatement JURISSO de toute utilisation non autorisee de son compte ou de toute atteinte a la securite de son compte. JURISSO ne pourra etre tenue responsable des consequences d&apos;une utilisation frauduleuse du compte d&apos;un Utilisateur.
        </p>
        <p className={styles.paragraph}>
          L&apos;inscription est reservee aux personnes physiques majeures ou aux personnes morales valablement representees. L&apos;Utilisateur garantit disposer de la capacite juridique necessaire pour s&apos;engager au titre des presentes CGU.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 4 — Description du Service</h2>
        <p className={styles.paragraph}>
          Le Service permet aux Utilisateurs de :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Effectuer des recherches plein-texte dans un corpus de decisions de justice et de textes legislatifs</li>
          <li className={styles.listItem}>Sauvegarder des documents en favoris</li>
          <li className={styles.listItem}>Creer et gerer des alertes de veille juridique (selon le plan souscrit)</li>
          <li className={styles.listItem}>Annoter et surligner des passages de documents (selon le plan souscrit)</li>
          <li className={styles.listItem}>Constituer des collections thematiques (selon le plan souscrit)</li>
          <li className={styles.listItem}>Exporter des documents au format PDF (selon le plan souscrit)</li>
        </ul>
        <p className={styles.paragraph}>
          Les fonctionnalites disponibles varient selon le plan souscrit par l&apos;Utilisateur. Le detail des plans et de leurs fonctionnalites est decrit sur la page Tarifs du site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 5 — Obligations de l&apos;Utilisateur</h2>
        <p className={styles.paragraph}>
          L&apos;Utilisateur s&apos;engage a utiliser le Service de maniere conforme a la loi, aux presentes CGU et aux usages habituels. En particulier, l&apos;Utilisateur s&apos;interdit de :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Utiliser le Service a des fins illicites, frauduleuses ou portant atteinte aux droits de tiers</li>
          <li className={styles.listItem}>Tenter de contourner les mesures de securite ou les limitations d&apos;acces du Service</li>
          <li className={styles.listItem}>Extraire de maniere systematique et massive le Contenu du Service (scraping, data mining) sans autorisation</li>
          <li className={styles.listItem}>Redistribuer ou commercialiser le Contenu du Service sans autorisation</li>
          <li className={styles.listItem}>Perturber le fonctionnement du Service ou de son infrastructure</li>
          <li className={styles.listItem}>Usurper l&apos;identite d&apos;un tiers ou creer de faux comptes</li>
        </ul>
        <p className={styles.paragraph}>
          Tout manquement a ces obligations peut entrainer la suspension ou la suppression du compte de l&apos;Utilisateur, sans prejudice des dommages-interets qui pourraient etre reclames par JURISSO.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 6 — Propriete intellectuelle</h2>
        <p className={styles.paragraph}>
          Les decisions de justice et les textes legislatifs diffuses sur le Service sont des documents publics qui ne sont pas couverts par le droit d&apos;auteur. L&apos;Utilisateur est libre de les reproduire, copier et diffuser.
        </p>
        <p className={styles.paragraph}>
          En revanche, la structure du Service, les algorithmes de recherche, le code source, le design, les marques et tous les elements originaux du Service sont proteges par le droit de la propriete intellectuelle et sont la propriete exclusive de JURISSO SAS.
        </p>
        <p className={styles.paragraph}>
          Les annotations et contenus crees par l&apos;Utilisateur restent sa propriete. L&apos;Utilisateur accorde a JURISSO une licence non exclusive, gratuite et limitee a l&apos;execution du Service pour le stockage et l&apos;affichage de ces contenus.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 7 — Limitation de responsabilite</h2>
        <p className={styles.paragraph}>
          JURISSO met tout en oeuvre pour assurer la disponibilite et la qualite du Service. Toutefois, le Service est fourni &laquo; en l&apos;etat &raquo; sans garantie d&apos;aucune sorte. JURISSO ne saurait garantir :
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>L&apos;absence d&apos;erreurs ou d&apos;interruptions dans le fonctionnement du Service</li>
          <li className={styles.listItem}>L&apos;exactitude, l&apos;exhaustivite ou l&apos;actualite des informations diffusees</li>
          <li className={styles.listItem}>L&apos;adequation du Service aux besoins specifiques de l&apos;Utilisateur</li>
        </ul>
        <p className={styles.paragraph}>
          Le Contenu du Service a un caractere purement informatif et ne constitue en aucun cas un avis juridique. L&apos;Utilisateur est seul responsable de l&apos;utilisation qu&apos;il fait des informations obtenues via le Service.
        </p>
        <p className={styles.paragraph}>
          En tout etat de cause, la responsabilite de JURISSO est limitee au montant des sommes effectivement versees par l&apos;Utilisateur au titre de son abonnement au cours des 12 derniers mois.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 8 — Suspension et resiliation</h2>
        <p className={styles.paragraph}>
          L&apos;Utilisateur peut resilier son compte a tout moment depuis les parametres de son Compte. La resiliation prend effet a la fin de la periode d&apos;abonnement en cours.
        </p>
        <p className={styles.paragraph}>
          JURISSO peut suspendre ou supprimer le compte d&apos;un Utilisateur en cas de manquement aux presentes CGU, apres notification prealable par email, sauf en cas d&apos;urgence ou de violation grave justifiant une suspension immediate.
        </p>
        <p className={styles.paragraph}>
          En cas de suppression du compte, l&apos;Utilisateur dispose d&apos;un delai de 30 jours pour exporter ses donnees (annotations, collections, favoris). Passe ce delai, les donnees seront definitivement supprimees.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 9 — Droit applicable et litiges</h2>
        <p className={styles.paragraph}>
          Les presentes CGU sont soumises au droit francais. En cas de litige relatif a l&apos;interpretation ou a l&apos;execution des presentes CGU, les parties s&apos;efforceront de trouver une solution amiable.
        </p>
        <p className={styles.paragraph}>
          A defaut de resolution amiable dans un delai de 30 jours, l&apos;Utilisateur peut recourir gratuitement au service de mediation de la consommation suivant : Mediation de la consommation — Centre de mediation et d&apos;arbitrage de Paris (CMAP), 39 avenue Franklin Roosevelt, 75008 Paris.
        </p>
        <p className={styles.paragraph}>
          En cas d&apos;echec de la mediation, le litige sera soumis aux tribunaux competents de Paris, sauf disposition legale contraire en faveur du consommateur.
        </p>
      </section>
    </article>
  );
}
