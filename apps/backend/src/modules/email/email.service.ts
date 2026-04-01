import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter;
  private readonly fromAddress: string;
  private readonly fromName: string;
  private readonly appUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });

    this.fromName = this.configService.get<string>('EMAIL_FROM_NAME', 'JURISSO');
    this.fromAddress = this.configService.get<string>('EMAIL_FROM', 'noreply@jurisso.fr');
    this.appUrl = this.configService.get<string>('APP_URL', 'https://app.jurisso.fr');
  }

  // ---------------------------------------------------------------------------
  // 1. Verification email (24h TTL)
  // ---------------------------------------------------------------------------
  async sendVerificationEmail(to: string, firstName: string, token: string): Promise<void> {
    const verifyUrl = `${this.appUrl}/auth/verify-email?token=${token}`;
    const subject = 'Confirmez votre adresse email - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Bienvenue sur JURISSO, ${this.esc(firstName)} !</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Merci de vous etre inscrit(e). Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
      </p>
      ${this.ctaButton('Confirmer mon email', verifyUrl)}
      <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
        Ce lien est valable <strong>24 heures</strong>. Si vous n'avez pas cree de compte, ignorez simplement cet email.
      </p>
      <p style="color:#999;font-size:12px;line-height:1.6;margin:16px 0 0;">
        Lien direct : <a href="${verifyUrl}" style="color:#1A3CFF;word-break:break-all;">${verifyUrl}</a>
      </p>
    `);

    const text = `Bienvenue sur JURISSO, ${firstName} !\n\nConfirmez votre email en ouvrant ce lien (valable 24h) :\n${verifyUrl}\n\nSi vous n'avez pas cree de compte, ignorez cet email.`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 2. Welcome email (after verification)
  // ---------------------------------------------------------------------------
  async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
    const subject = 'Votre compte JURISSO est actif !';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Felicitations, ${this.esc(firstName)} !</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Votre adresse email a bien ete verifiee. Votre compte JURISSO est desormais pleinement actif.
      </p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Voici ce que vous pouvez faire :
      </p>
      <ul style="color:#333;font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
        <li>Rechercher des decisions de justice dans notre base</li>
        <li>Creer des alertes pour suivre de nouvelles publications</li>
        <li>Organiser vos documents dans des collections</li>
        <li>Annoter et partager vos analyses</li>
      </ul>
      ${this.ctaButton('Acceder a JURISSO', this.appUrl)}
    `);

    const text = `Felicitations, ${firstName} !\n\nVotre adresse email a bien ete verifiee et votre compte est actif.\n\nAccedez a JURISSO : ${this.appUrl}`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 3. Password reset (1h TTL)
  // ---------------------------------------------------------------------------
  async sendPasswordResetEmail(to: string, firstName: string, token: string): Promise<void> {
    const resetUrl = `${this.appUrl}/auth/reset-password?token=${token}`;
    const subject = 'Reinitialisation de votre mot de passe - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Reinitialisation du mot de passe</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Bonjour ${this.esc(firstName)}, nous avons recu une demande de reinitialisation de votre mot de passe JURISSO.
      </p>
      ${this.ctaButton('Reinitialiser mon mot de passe', resetUrl)}
      <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
        Ce lien est valable <strong>1 heure</strong>. Si vous n'etes pas a l'origine de cette demande, ignorez cet email. Votre mot de passe actuel reste inchange.
      </p>
      <p style="color:#999;font-size:12px;line-height:1.6;margin:16px 0 0;">
        Lien direct : <a href="${resetUrl}" style="color:#1A3CFF;word-break:break-all;">${resetUrl}</a>
      </p>
    `);

    const text = `Bonjour ${firstName},\n\nReinitialisation de mot de passe demandee.\nLien (valable 1h) : ${resetUrl}\n\nSi vous n'etes pas a l'origine de cette demande, ignorez cet email.`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 4. Alert: new matching decisions
  // ---------------------------------------------------------------------------
  async sendAlertEmail(
    to: string,
    firstName: string,
    alertName: string,
    newDocuments: { title: string; url: string }[],
  ): Promise<void> {
    const subject = `Nouvelle(s) decision(s) pour votre alerte "${alertName}" - JURISSO`;

    const docListHtml = newDocuments
      .map(
        (d) =>
          `<li style="margin-bottom:8px;"><a href="${this.esc(d.url)}" style="color:#1A3CFF;text-decoration:none;">${this.esc(d.title)}</a></li>`,
      )
      .join('');

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Alerte : ${this.esc(alertName)}</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Bonjour ${this.esc(firstName)}, ${newDocuments.length} nouvelle(s) decision(s) correspondent a votre alerte :
      </p>
      <ul style="color:#333;font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
        ${docListHtml}
      </ul>
      ${this.ctaButton('Voir toutes les alertes', `${this.appUrl}/alerts`)}
    `);

    const docListText = newDocuments.map((d) => `- ${d.title} : ${d.url}`).join('\n');
    const text = `Bonjour ${firstName},\n\n${newDocuments.length} nouvelle(s) decision(s) pour votre alerte "${alertName}" :\n\n${docListText}\n\nVoir vos alertes : ${this.appUrl}/alerts`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 5. Weekly summary
  // ---------------------------------------------------------------------------
  async sendWeeklySummaryEmail(
    to: string,
    firstName: string,
    stats: { searches: number; savedDocuments: number; alertMatches: number },
  ): Promise<void> {
    const subject = 'Votre resume hebdomadaire - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Resume de la semaine</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Bonjour ${this.esc(firstName)}, voici votre activite de la semaine ecoulee :
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        <tr>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:15px;color:#333;">Recherches effectuees</td>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:20px;font-weight:bold;color:#1A3CFF;text-align:center;">${stats.searches}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:15px;color:#333;">Documents sauvegardes</td>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:20px;font-weight:bold;color:#1A3CFF;text-align:center;">${stats.savedDocuments}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:15px;color:#333;">Correspondances d'alertes</td>
          <td style="padding:12px 16px;border:1px solid #E5E7EB;font-size:20px;font-weight:bold;color:#1A3CFF;text-align:center;">${stats.alertMatches}</td>
        </tr>
      </table>
      ${this.ctaButton('Acceder a JURISSO', this.appUrl)}
    `);

    const text = `Bonjour ${firstName},\n\nResume de la semaine :\n- Recherches : ${stats.searches}\n- Documents sauvegardes : ${stats.savedDocuments}\n- Correspondances d'alertes : ${stats.alertMatches}\n\n${this.appUrl}`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 6. Subscription confirmation
  // ---------------------------------------------------------------------------
  async sendSubscriptionConfirmationEmail(
    to: string,
    firstName: string,
    plan: string,
    renewalDate: string,
  ): Promise<void> {
    const subject = 'Confirmation de votre abonnement - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Abonnement confirme !</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Bonjour ${this.esc(firstName)}, votre abonnement au plan <strong>${this.esc(plan)}</strong> a ete active avec succes.
      </p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Prochaine date de renouvellement : <strong>${this.esc(renewalDate)}</strong>
      </p>
      ${this.ctaButton('Gerer mon abonnement', `${this.appUrl}/account/subscription`)}
    `);

    const text = `Bonjour ${firstName},\n\nVotre abonnement au plan ${plan} est actif.\nProchain renouvellement : ${renewalDate}\n\nGerer votre abonnement : ${this.appUrl}/account/subscription`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 7. Renewal reminder (J-7)
  // ---------------------------------------------------------------------------
  async sendRenewalReminderEmail(
    to: string,
    firstName: string,
    plan: string,
    renewalDate: string,
  ): Promise<void> {
    const subject = 'Renouvellement de votre abonnement dans 7 jours - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Rappel de renouvellement</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Bonjour ${this.esc(firstName)}, votre abonnement <strong>${this.esc(plan)}</strong> sera renouvele automatiquement le <strong>${this.esc(renewalDate)}</strong>.
      </p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Si vous souhaitez modifier ou annuler votre abonnement, vous pouvez le faire depuis votre espace personnel.
      </p>
      ${this.ctaButton('Gerer mon abonnement', `${this.appUrl}/account/subscription`)}
    `);

    const text = `Bonjour ${firstName},\n\nRappel : votre abonnement ${plan} sera renouvele le ${renewalDate}.\n\nGerer votre abonnement : ${this.appUrl}/account/subscription`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 8. RGPD data export ready
  // ---------------------------------------------------------------------------
  async sendDataExportReadyEmail(to: string, firstName: string, downloadUrl: string): Promise<void> {
    const subject = 'Votre export de donnees est pret - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Export de donnees pret</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Bonjour ${this.esc(firstName)}, l'export de vos donnees personnelles est pret au telechargement. Conformement au RGPD, ce fichier contient l'integralite de vos donnees.
      </p>
      ${this.ctaButton('Telecharger mes donnees', downloadUrl)}
      <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
        Ce lien de telechargement est valable <strong>48 heures</strong>. Passe ce delai, vous devrez effectuer une nouvelle demande.
      </p>
    `);

    const text = `Bonjour ${firstName},\n\nVotre export de donnees est pret.\nTelechargez-le ici (valable 48h) : ${downloadUrl}`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 9. New device login (security alert)
  // ---------------------------------------------------------------------------
  async sendNewDeviceLoginEmail(
    to: string,
    firstName: string,
    device: string,
    ip: string,
    blockUrl: string,
  ): Promise<void> {
    const subject = 'Connexion depuis un nouvel appareil - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">Nouvelle connexion detectee</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Bonjour ${this.esc(firstName)}, une connexion a ete effectuee depuis un nouvel appareil :
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        <tr>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#666;font-weight:bold;">Appareil</td>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#333;">${this.esc(device)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#666;font-weight:bold;">Adresse IP</td>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#333;">${this.esc(ip)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#666;font-weight:bold;">Date</td>
          <td style="padding:10px 16px;border:1px solid #E5E7EB;font-size:14px;color:#333;">${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</td>
        </tr>
      </table>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Si ce n'est pas vous, bloquez immediatement cet acces :
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 24px;">
        <tr>
          <td style="border-radius:6px;background:#DC2626;">
            <a href="${blockUrl}" style="display:inline-block;padding:14px 32px;color:#FFFFFF;font-size:16px;font-weight:600;text-decoration:none;">Bloquer cet acces</a>
          </td>
        </tr>
      </table>
      <p style="color:#666;font-size:14px;line-height:1.6;margin:0;">
        Si c'est bien vous, aucune action n'est requise.
      </p>
    `);

    const text = `Bonjour ${firstName},\n\nNouvelle connexion detectee :\n- Appareil : ${device}\n- IP : ${ip}\n- Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}\n\nSi ce n'est pas vous, bloquez cet acces : ${blockUrl}`;

    await this.send(to, subject, html, text);
  }

  // ---------------------------------------------------------------------------
  // 10. 2FA enabled confirmation
  // ---------------------------------------------------------------------------
  async sendTwoFAEnabledEmail(to: string, firstName: string): Promise<void> {
    const subject = 'Authentification a deux facteurs activee - JURISSO';

    const html = this.layout(`
      <h1 style="color:#0A0A0F;font-size:24px;margin:0 0 16px;">2FA activee avec succes</h1>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px;">
        Bonjour ${this.esc(firstName)}, l'authentification a deux facteurs a bien ete activee sur votre compte JURISSO.
      </p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 24px;">
        A partir de maintenant, un code supplementaire vous sera demande a chaque connexion. Pensez a conserver vos codes de secours en lieu sur.
      </p>
      ${this.ctaButton('Gerer la securite', `${this.appUrl}/account/security`)}
      <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
        Si vous n'etes pas a l'origine de cette action, contactez immediatement notre support.
      </p>
    `);

    const text = `Bonjour ${firstName},\n\nL'authentification a deux facteurs a ete activee sur votre compte JURISSO.\n\nConservez vos codes de secours en lieu sur.\n\nSi vous n'etes pas a l'origine de cette action, contactez notre support.`;

    await this.send(to, subject, html, text);
  }

  // ===========================================================================
  // Private helpers
  // ===========================================================================

  private async send(to: string, subject: string, html: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"${this.fromName}" <${this.fromAddress}>`,
        to,
        subject,
        html,
        text,
      });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error}`);
      // Do not throw - email failures should not break the main flow
    }
  }

  private esc(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private ctaButton(label: string, url: string): string {
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 0;">
        <tr>
          <td style="border-radius:6px;background:#1A3CFF;">
            <a href="${url}" style="display:inline-block;padding:14px 32px;color:#FFFFFF;font-size:16px;font-weight:600;text-decoration:none;">${label}</a>
          </td>
        </tr>
      </table>
    `;
  }

  private layout(content: string): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#F3F4F6;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin:0 auto;max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="background:#0A0A0F;padding:24px 32px;border-radius:8px 8px 0 0;">
              <span style="color:#FFFFFF;font-size:22px;font-weight:700;letter-spacing:1px;">JURISSO</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:32px;border-radius:0 0 8px 8px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <p style="color:#9CA3AF;font-size:12px;line-height:1.6;margin:0;">
                JURISSO - Recherche juridique intelligente<br>
                Cet email a ete envoye automatiquement, merci de ne pas y repondre.<br>
                <a href="${this.appUrl}/account/notifications" style="color:#9CA3AF;text-decoration:underline;">Gerer mes preferences email</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
