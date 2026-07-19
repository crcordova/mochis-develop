'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface FeatureSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const JuegosIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 11h4" />
    <path d="M8 9v4" />
    <path d="M15 12h.01" />
    <path d="M17 10h.01" />
    <rect x="2" y="6" width="20" height="12" rx="4" />
  </svg>
);

const CompaniaIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.3L2 20l3.9-1.9a9 9 0 0 0 2 1.9z" />
    <path d="M12 8v2" />
    <path d="M12 14h.01" />
  </svg>
);

const IdiomasIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PersonalizableIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 21v-7" />
    <path d="M4 10V3" />
    <path d="M12 21v-9" />
    <path d="M12 8V3" />
    <path d="M20 21v-5" />
    <path d="M20 12V3" />
    <path d="M1 14h6" />
    <path d="M9 8h6" />
    <path d="M17 16h6" />
  </svg>
);

const FEATURES: FeatureSlide[] = [
  {
    id: 'juegos',
    title: 'Juegos Interactivos',
    description:
      'Juegos cortos, historias interactivas y adivinanzas que se adaptan al momento. Cada sesión es diferente: la IA improvisa, así que nunca se repite.',
    image: '/images/home/juegos.webp',
    icon: <JuegosIcon />,
  },
  {
    id: 'compania',
    title: 'Compañía Inteligente',
    description:
      'Conversaciones reales y apoyo emocional para niños y adultos. Puedes preguntarle de todo: cómo resolver un problema, qué canción escuchar, o simplemente hablar de tu día.',
    image: '/images/home/compania.webp',
    icon: <CompaniaIcon />,
  },
  {
    id: 'idiomas',
    title: 'Práctica de Idiomas',
    description:
      'Aprende inglés y otros idiomas de forma lúdica. Mimi traduce, corrige pronunciación y enseña vocabulario nuevo con juegos que se sienten como jugar, no como estudiar.',
    image: '/images/home/idiom.webp',
    icon: <IdiomasIcon />,
  },
  {
    id: 'personalizable',
    title: 'Personalizable con Roles',
    description:
      'Configura roles y planes de estudio para cada miembro de la familia. Mimi puede ser profesora de inglés para los niños, compañera de conversación para los adultos, o lo que tú necesites.',
    image: '/images/home/personalizable.webp',
    icon: <PersonalizableIcon />,
  },
];

const SLIDE_COUNT = FEATURES.length;

const textShadow = {
  textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.35)',
};

export function FeaturesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setActiveIndex(0);
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Total scrollable distance inside the showcase container.
      const trackHeight = rect.height - viewportHeight;
      const scrolled = -rect.top;

      const progress =
        trackHeight > 0
          ? Math.max(0, Math.min(1, scrolled / trackHeight))
          : 0;
      const index = Math.min(
        SLIDE_COUNT - 1,
        Math.max(0, Math.floor(progress * SLIDE_COUNT))
      );

      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SLIDE_COUNT * 100}vh` }}
      aria-label="Características de mochis-play"
    >
      {/* Sticky viewport: background + content stays pinned while the parent scrolls. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layers with crossfade. */}
        {FEATURES.map((feature, index) => (
          <div
            key={feature.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <Image
              src={feature.image}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className="object-cover scale-105"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Color overlay: brand purple to unify the section. */}
            <div
              className="absolute inset-0"
              style={{ background: 'var(--color-features-overlay)' }}
            />
            {/* Vignette to keep text legible at the edges. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 100%)',
              }}
            />
            {/* Top fade on the first slide so it blends into the Hero section. */}
            {index === 0 && (
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-brand-purple-700)] to-transparent" />
            )}
            {/* Bottom fade on the last slide so it blends into the CategoryPreview section. */}
            {index === SLIDE_COUNT - 1 && (
              <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent via-[var(--color-brand-purple-500)]/60 to-[var(--color-brand-purple-700)]" />
            )}
          </div>
        ))}

        {/* Content layer: one slide at a time, animated in/out. */}
        <div className="relative z-10 h-full w-full flex items-center justify-center px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]">
          {FEATURES.map((feature, index) => {
            const isActive = index === activeIndex;

            return (
              <section
                key={feature.id}
                id={feature.id}
                aria-labelledby={`${feature.id}-heading`}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <div className="max-w-5xl text-center text-[var(--color-text-inverse)]">
                  <div
                    className="mx-auto mb-[var(--space-xl)] flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 md:h-24 md:w-24"
                    aria-hidden="true"
                  >
                    <div className="h-8 w-8 text-white md:h-12 md:w-12">
                      {feature.icon}
                    </div>
                  </div>

                  <h2
                    id={`${feature.id}-heading`}
                    className="font-balloon text-[length:var(--text-display-xl)] font-[var(--font-weight-bold)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                    style={textShadow}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className="mx-auto mt-[var(--space-lg)] max-w-3xl text-[length:var(--text-body-xl)] leading-[var(--line-height-relaxed)] opacity-95"
                    style={textShadow}
                  >
                    {feature.description}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* Slide progress indicator. */}
        <div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-[var(--space-sm)]"
          aria-hidden="true"
        >
          {FEATURES.map((feature, index) => (
            <a
              key={feature.id}
              href={`#${feature.id}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir a ${feature.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
