'use client';

import { useTracking } from '@/lib/useTracking';
import { Button } from '@/components/ui';

interface ContactoClientProps {
  email: string;
  whatsappNumber: string | null;
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.77 1.52V6.82a4.84 4.84 0 0 1-1.01-.13Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function ContactoClient({
  email,
  whatsappNumber,
  social,
}: ContactoClientProps) {
  const { trackCustom } = useTracking();

  const handleEmailClick = () => {
    trackCustom('contact_email_click', { destination: email });
  };

  const handleWhatsAppClick = () => {
    trackCustom('contact_whatsapp_click', { destination: whatsappNumber! });
  };

  const handleSocialClick = (platform: string, destination: string) => {
    trackCustom('contact_social_click', { platform, destination });
  };

  return (
    <div className="space-y-[var(--space-xl)]">
      {/* Email Section */}
      <section
        className="bg-[var(--color-bg-card)] rounded-[var(--radius-card)] shadow-card p-[var(--space-lg)]"
      >
        <a
          href={`mailto:${email}`}
          onClick={handleEmailClick}
          className="flex items-center gap-[var(--space-md)] group"
          aria-label={`Enviar email a ${email}`}
        >
          <span className="flex-shrink-0 text-[var(--color-primary)] transition-colors duration-base group-hover:text-[var(--color-primary-hover)]">
            <EmailIcon />
          </span>
          <div>
            <p className="text-[var(--font-weight-semibold)] text-[var(--color-text)]">
              Email
            </p>
            <p className="text-[var(--text-body)] text-[var(--color-text-link)] group-hover:text-[var(--color-text-link-hover)] underline-offset-4 group-hover:underline">
              {email}
            </p>
          </div>
        </a>
      </section>

      {/* WhatsApp Section */}
      <section
        className="bg-[var(--color-bg-card)] rounded-[var(--radius-card)] shadow-card p-[var(--space-lg)]"
      >
        {whatsappNumber ? (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-[var(--space-md)] group"
            aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
          >
            <span className="flex-shrink-0 text-[var(--color-primary)] transition-colors duration-base group-hover:text-[var(--color-primary-hover)]">
              <WhatsAppIcon />
            </span>
            <div>
              <p className="text-[var(--font-weight-semibold)] text-[var(--color-text)]">
                WhatsApp
              </p>
              <p className="text-[var(--text-body)] text-[var(--color-text-link)] group-hover:text-[var(--color-text-link-hover)] underline-offset-4 group-hover:underline">
                Escríbenos por WhatsApp
                <span className="sr-only"> (abre en nueva pestaña)</span>
              </p>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-[var(--space-md)] opacity-50">
            <span className="flex-shrink-0 text-[var(--color-text-muted)]">
              <WhatsAppIcon />
            </span>
            <div>
              <p className="text-[var(--font-weight-semibold)] text-[var(--color-text)]">
                WhatsApp
              </p>
              <p className="text-[var(--text-body)] text-[var(--color-text-muted)]">
                WhatsApp no disponible
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Social Links Section */}
      <section
        className="bg-[var(--color-bg-card)] rounded-[var(--radius-card)] shadow-card p-[var(--space-lg)]"
      >
        <h2 className="text-[var(--text-heading-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text)] mb-[var(--space-md)]">
          Redes Sociales
        </h2>
        <div className="flex flex-wrap gap-[var(--space-md)]">
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('instagram', social.instagram)}
            className="flex items-center gap-[var(--space-sm)] px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] border border-[var(--color-border)] transition-colors duration-base hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-[var(--color-text)]"
            aria-label="Síguenos en Instagram (abre en nueva pestaña)"
          >
            <InstagramIcon />
            <span className="text-[var(--text-body)] font-[var(--font-weight-medium)]">
              Instagram
            </span>
          </a>

          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('tiktok', social.tiktok)}
            className="flex items-center gap-[var(--space-sm)] px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] border border-[var(--color-border)] transition-colors duration-base hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-[var(--color-text)]"
            aria-label="Síguenos en TikTok (abre en nueva pestaña)"
          >
            <TikTokIcon />
            <span className="text-[var(--text-body)] font-[var(--font-weight-medium)]">
              TikTok
            </span>
          </a>

          <a
            href={social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('youtube', social.youtube)}
            className="flex items-center gap-[var(--space-sm)] px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] border border-[var(--color-border)] transition-colors duration-base hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-[var(--color-text)]"
            aria-label="Síguenos en YouTube (abre en nueva pestaña)"
          >
            <YouTubeIcon />
            <span className="text-[var(--text-body)] font-[var(--font-weight-medium)]">
              YouTube
            </span>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center pt-[var(--space-md)]">
        <p className="text-[var(--text-body)] text-[var(--color-text-secondary)] mb-[var(--space-md)]">
          ¿Listo para tener tu peluche con IA?
        </p>
        <Button href="/tienda" trackingLabel="contacto_cta_tienda">
          Ver Tienda
        </Button>
      </section>
    </div>
  );
}
