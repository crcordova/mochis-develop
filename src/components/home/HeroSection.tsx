import Image from 'next/image';
import { Button } from '@/components/ui';
import siteData from '@/data/site.json';

/**
 * Home Hero Section — full-width sharp background with violet overlay.
 *
 * Server component: the hero image is static, so no client hooks are required.
 * The 1672x941 WebP image is loaded with `priority` because it is the LCP
 * element of the page.
 *
 * Layout:
 * - The hero image fills the entire section with `object-cover`, no blur.
 * - A violet-tinted overlay unifies the look with FeaturesShowcase below.
 * - A bottom gradient fades into the first feature slide background so the
 *   transition between Hero and FeaturesShowcase is seamless.
 * - A radial vignette keeps centered text legible.
 * - The H1, description, buttons, and disclaimer are centered on top.
 *
 * Responsive:
 * - Mobile (<768px): min-h-[70vh]
 * - Desktop (>=768px): min-h-[80vh]
 */
const heroTextShadow = {
  textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.35)',
};

export function HeroSection() {
  return (
    <section
      aria-label="Inicio"
      className="relative min-h-[70vh] overflow-hidden bg-[var(--color-bg)] md:min-h-[80vh]"
    >
      {/* Layer 1: Background image — full-bleed and sharp. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-home.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          quality={90}
          aria-hidden="true"
          className="object-cover"
        />
      </div>

      {/* Layer 2: Brand purple overlay + vignette to match FeaturesShowcase. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'var(--color-hero-overlay)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Layer 3: Bottom fade-out into the first feature slide background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[var(--color-brand-purple-700)] to-transparent"
      />

      {/* Layer 4: Content — centered text on top of the background. */}
      <div className="relative z-[2] mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-[var(--space-md)] py-[var(--space-2xl)] text-center md:min-h-[80vh] sm:py-[var(--space-3xl)]">
        <h1
          className="font-balloon text-[length:var(--text-hero)] font-[var(--font-weight-bold)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-inverse)]"
          style={heroTextShadow}
        >
          mochis
        </h1>
        <p
          className="mt-[var(--space-lg)] max-w-3xl text-[length:var(--text-body-xl)] leading-[var(--line-height-relaxed)] text-[var(--color-text-inverse)] opacity-95"
          style={heroTextShadow}
        >
          {siteData.site.description}
        </p>
        <div className="mt-[var(--space-8)] flex flex-wrap justify-center gap-[var(--space-md)]">
          <Button
            href="/tienda"
            variant="primary"
            size="lg"
            trackingLabel="home_hero_tienda"
          >
            Ver Peluches
          </Button>
          <Button
            href="/tutoriales"
            variant="outline"
            size="lg"
            trackingLabel="home_hero_tutoriales"
          >
            ¿Cómo Funciona?
          </Button>
        </div>
        <p
          className="mt-[var(--space-lg)] text-[var(--text-body-sm)] text-[var(--color-text-inverse)] opacity-70"
          style={heroTextShadow}
        >
          {siteData.disclaimer.short}
        </p>
      </div>
    </section>
  );
}
