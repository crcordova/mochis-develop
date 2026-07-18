import Image from 'next/image';
import { Card, Badge, Button } from '@/components/ui';
import productsData from '@/data/products.json';

const mochisCategory = productsData.categories[0];
const ponejosCategory = productsData.categories[2];

const categoryPreviews = [
  {
    category: mochisCategory,
    badgeVariant: 'mochis' as const,
    badgeLabel: 'mochis',
    cardTitle: 'Mochis',
    collectionImage: '/images/categories/mochis-collection.webp',
    trackingId: 'home_preview_mochis',
    buttonLabel: 'home_category_mochis',
    buttonText: 'Ver mochis',
    glowColor: 'var(--color-category-mochis)',
  },
  {
    category: ponejosCategory,
    badgeVariant: 'ponejos' as const,
    badgeLabel: 'Ponejos',
    cardTitle: 'Ponejos',
    collectionImage: '/images/categories/ponejos-collection.webp',
    trackingId: 'home_preview_ponejos',
    buttonLabel: 'home_category_ponejos',
    buttonText: 'Ver Ponejos',
    glowColor: 'var(--color-category-ponejos)',
  },
];

const headingTextShadow = {
  textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.35)',
};

export function CategoryPreview() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="relative flex min-h-[60vh] items-center overflow-hidden py-[var(--space-2xl)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
    >
      {/* Background image — full-bleed with violet overlay to match the hero/features look. */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/hero-home.webp"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-950/90 via-violet-900/75 to-violet-950/90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Top fade-in from the FeaturesShowcase section above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-violet-950 via-violet-950/80 to-transparent"
      />
      {/* Bottom fade-out into the AI Disclaimer section below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-violet-950 via-violet-950/80 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h2
          id="categories-heading"
          className="font-display text-[var(--text-heading-lg)] font-[var(--font-weight-bold)] text-[var(--color-text-inverse)] text-center mb-[var(--space-2xl)]"
          style={headingTextShadow}
        >
          Conoce a nuestros peluches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)] items-stretch">
          {categoryPreviews.map((cat) => (
            <div
              key={cat.trackingId}
              className="relative flex flex-col h-full gap-[var(--space-md)]"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-[var(--space-md)] -z-10 rounded-[var(--radius-card)] opacity-60 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${cat.glowColor} 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />
              <Card
                title={cat.cardTitle}
                description={cat.category.description}
                image={cat.collectionImage}
                trackingId={cat.trackingId}
                trackingData={{ category: cat.badgeLabel.toLowerCase() }}
              >
                <Badge label={cat.badgeLabel} variant={cat.badgeVariant} />
              </Card>
              <Button
                href="/tienda"
                variant="outline"
                size="sm"
                trackingLabel={cat.buttonLabel}
              >
                {cat.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
