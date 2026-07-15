import type { Metadata } from 'next';
import siteData from '@/data/site.json';
import { ContactoClient } from './ContactoClient';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta a mochis-play por email o WhatsApp. Síguenos en Instagram, TikTok y YouTube para novedades sobre peluches con IA.',
};

export default function ContactoPage() {
  const whatsappNumber = process.env.WHATSAPP_NUMBER?.trim() || null;

  return (
    <main
      id="main-content"
      className="px-[var(--space-md)] py-[var(--space-3xl)]"
    >
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-[var(--space-2xl)]">
          <h1 className="text-[var(--text-heading-xl)] font-[var(--font-weight-bold)] text-[var(--color-text)] mb-[var(--space-sm)]">
            Contacto
          </h1>
          <p className="text-[var(--text-body-lg)] text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            ¿Tienes preguntas o quieres saber más? Escríbenos o síguenos en redes sociales.
          </p>
        </header>

        <ContactoClient
          email={siteData.contact.email}
          whatsappNumber={whatsappNumber}
          social={siteData.social}
        />
      </div>
    </main>
  );
}
