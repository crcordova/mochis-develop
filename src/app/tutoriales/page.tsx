import type { Metadata } from 'next';
import tutorialsData from '@/data/tutorials.json';
import { PageBackground } from '@/components/layout';
import { TutorialesClient } from './TutorialesClient';

export const metadata: Metadata = {
  title: 'Tutoriales',
  description:
    'Videos tutoriales para configurar y personalizar tu peluche mochis-play. Aprende a conectar WiFi, configurar roles de IA y crear planes de estudio.',
};

export default function TutorialesPage() {
  const { tutorials, categories } = tutorialsData;

  return (
    <main
      id="main-content"
      className="relative mx-auto max-w-6xl px-[var(--space-md)] py-[var(--space-3xl)]"
    >
      {/* Background image — using the hero image as a placeholder until page-specific images are ready. */}
      <PageBackground imageSrc="/images/hero/hero-home.webp" overlay="hero" washOpacity={80} />

      {/* Page header */}
      <header className="mb-[var(--space-2xl)] text-center">
        <h1 className="text-[var(--text-heading-xl)] font-[var(--font-weight-bold)] text-[var(--color-text)] leading-[var(--line-height-tight)]">
          Tutoriales
        </h1>
        <p className="mt-[var(--space-sm)] text-[var(--text-body-lg)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)] max-w-2xl mx-auto">
          Aprende a configurar y personalizar tu peluche mochis-play con estos
          videos paso a paso.
        </p>
      </header>

      <TutorialesClient tutorials={tutorials} categories={categories} />
    </main>
  );
}
