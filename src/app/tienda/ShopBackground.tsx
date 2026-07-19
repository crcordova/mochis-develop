'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * Background image for the shop page, mirroring the home hero treatment.
 *
 * A full-bleed static image sits behind a violet overlay and radial vignette
 * so the product grid stays readable. Floating blobs are kept as a subtle
 * decorative layer on top. Respects `prefers-reduced-motion`.
 */
export function ShopBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1: Background image — full-bleed and sharp. */}
      <div className="absolute inset-0">
        <Image
          src="/images/tienda/tienda-bg.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </div>

      {/* Layer 2: Brand purple overlay + vignette to match the home hero. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'var(--color-shop-overlay)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Layer 3: Page-surface wash so cards remain legible. */}
      <div className="absolute inset-0 z-[1] bg-[var(--color-bg)]/60" />

      {/* Layer 4: Subtle floating blobs. */}
      <Blob
        position="-top-[10%] -left-[10%] w-[45%] h-[45%]"
        color="bg-[var(--color-primary-light)]"
        opacity="opacity-20"
        parallax={scrollY * 0.05}
        animation="animate-float"
      />
      <Blob
        position="top-[25%] -right-[10%] w-[40%] h-[40%]"
        color="bg-[var(--color-secondary-light)]"
        opacity="opacity-15"
        parallax={scrollY * -0.08}
        animation="animate-float-delayed"
      />
      <Blob
        position="top-[55%] left-[5%] w-[35%] h-[35%]"
        color="bg-[var(--color-category-ponejos-bg)]"
        opacity="opacity-20"
        parallax={scrollY * 0.06}
        animation="animate-float-slow"
      />
      <Blob
        position="-bottom-[10%] right-[10%] w-[45%] h-[45%]"
        color="bg-[var(--color-category-mochis-bg)]"
        opacity="opacity-15"
        parallax={scrollY * -0.04}
        animation="animate-float"
      />
    </div>
  );
}

interface BlobProps {
  position: string;
  color: string;
  opacity: string;
  parallax: number;
  animation: string;
}

function Blob({ position, color, opacity, parallax, animation }: BlobProps) {
  return (
    <div
      className={`absolute ${position}`}
      style={{ transform: `translateY(${parallax}px)` }}
    >
      <div
        className={`h-full w-full rounded-full blur-[100px] ${color} ${opacity} ${animation}`}
      />
    </div>
  );
}
