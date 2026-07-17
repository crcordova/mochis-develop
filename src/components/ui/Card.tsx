'use client';

import Image from 'next/image';
import { useCallback, type KeyboardEvent } from 'react';
import { trackEvent } from '@/lib/analytics';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  onClick?: () => void;
  trackingId?: string;
  trackingData?: Record<string, string | number | boolean>;
  children?: React.ReactNode;
  className?: string;
}

function ImagePlaceholder() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

/**
 * Versatile card for products, tutorials, and blog posts.
 * Supports optional image, click tracking, and a children slot for badges/buttons.
 */
export function Card({
  title,
  description,
  image,
  onClick,
  trackingId,
  trackingData,
  children,
  className = '',
}: CardProps) {
  const isClickable = Boolean(onClick);

  const handleClick = useCallback(() => {
    if (trackingId) {
      trackEvent({
        action: 'card_click',
        category: 'ui',
        label: trackingId,
        value: trackingData,
      });
    }
    onClick?.();
  }, [trackingId, trackingData, onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isClickable) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [isClickable, handleClick]
  );

  return (
    <div
      className={[
        'w-full h-full flex flex-col overflow-hidden',
        'bg-[var(--color-bg-card)]',
        'rounded-[var(--radius-card)]',
        'shadow-[var(--shadow-card)]',
        'transition-shadow duration-[var(--duration-base)] ease-[var(--easing-default)]',
        isClickable
          ? 'cursor-pointer hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Image area — 1:1 aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Content area */}
      <div className="p-[var(--space-md)] flex flex-col gap-[var(--space-sm)] flex-grow">
        <h3 className="text-[var(--text-heading-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text)] leading-[var(--line-height-tight)]">
          {title}
        </h3>

        {description ? (
          <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]">
            {description}
          </p>
        ) : null}

        {children ? (
          <div className="flex flex-wrap items-center gap-[var(--space-sm)] mt-[var(--space-xs)]">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
