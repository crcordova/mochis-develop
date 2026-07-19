import Image from 'next/image';

interface PageBackgroundProps {
  imageSrc: string;
  alt?: string;
  overlay?: 'hero' | 'shop' | 'features';
  washOpacity?: number;
}

const OVERLAY_STYLES: Record<NonNullable<PageBackgroundProps['overlay']>, string> = {
  hero: 'var(--color-hero-overlay)',
  shop: 'var(--color-shop-overlay)',
  features: 'var(--color-features-overlay)',
};

/**
 * Reusable full-page background image for interior pages.
 *
 * Mirrors the home hero treatment: a full-bleed image, a brand-purple overlay,
 * a radial vignette, and a light wash so content stays readable.
 *
 * Usage: place once inside the page's `<main>` as the first child. The `imageSrc`
 * prop makes it trivial to swap in the final page-specific background later.
 */
export function PageBackground({
  imageSrc,
  alt = '',
  overlay = 'hero',
  washOpacity = 80,
}: PageBackgroundProps) {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1: Background image — full-bleed and sharp. */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </div>

      {/* Layer 2: Brand purple overlay + vignette to match the home hero. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: OVERLAY_STYLES[overlay] }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Layer 3: Light wash so page content remains legible. */}
      <div
        className={`absolute inset-0 z-[1] bg-[var(--color-bg)]/${washOpacity}`}
      />
    </div>
  );
}
