'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, type KeyboardEvent } from 'react';
import { trackEvent } from '@/lib/analytics';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  onClick?: () => void;
  trackingId?: string;
  trackingData?: Record<string, string | number | boolean>;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  childrenClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
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

function CardImage({ image, title }: { image?: string; title: string }) {
  return (
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
  );
}

/**
 * Versatile card for products, tutorials, and blog posts.
 * Supports optional image, internal link (href), click tracking, and a children slot
 * for badges/buttons.
 *
 * When `href` is provided, only the image and text content are wrapped in the link;
 * the children slot is rendered outside the link so interactive elements (buttons)
 * remain clickable without triggering navigation.
 */
export function Card({
  title,
  description,
  image,
  href,
  onClick,
  trackingId,
  trackingData,
  children,
  className = '',
  contentClassName = '',
  childrenClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}: CardProps) {
  const isClickable = Boolean(onClick || href);

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
      if (!isClickable || href) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [isClickable, href, handleClick]
  );

  const containerClasses = [
    'relative w-full h-full flex flex-col overflow-hidden',
    'bg-[var(--color-bg-elevated)]',
    'rounded-[var(--radius-card)]',
    'border border-[var(--color-border)]',
    'shadow-[0_8px_30px_-10px_rgba(120,60,165,0.20)]',
    'transition-shadow duration-[var(--duration-base)] ease-[var(--easing-default)]',
    isClickable ? 'hover:shadow-[0_12px_40px_-12px_rgba(120,60,165,0.30)]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'p-[var(--space-md)] flex flex-col gap-[var(--space-sm)] flex-grow',
    contentClassName,
  ]
    .join(' ')
    .trim();

  const titleClasses = [
    'text-[var(--text-heading-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text)] leading-[var(--line-height-tight)]',
    titleClassName,
  ].join(' ');

  const descriptionClasses = [
    'text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]',
    descriptionClassName,
  ].join(' ');

  const childrenClasses = [
    'p-[var(--space-md)] flex flex-wrap items-center gap-[var(--space-sm)]',
    childrenClassName,
  ]
    .join(' ')
    .trim();

  const focusClasses =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]';

  const textContent = (
    <>
      <h3 className={titleClasses}>{title}</h3>
      {description ? <p className={descriptionClasses}>{description}</p> : null}
    </>
  );

  const bottomBand = (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-[var(--color-bg-elevated)] to-[rgba(120,60,165,0.25)]"
    />
  );

  if (href) {
    return (
      <div className={containerClasses}>
        <Link
          href={href}
          onClick={handleClick}
          className={[
            'flex flex-col flex-grow no-underline text-[var(--color-text)]',
            focusClasses,
          ].join(' ')}
        >
          <CardImage image={image} title={title} />
          <div className={textClasses}>{textContent}</div>
        </Link>
        {children ? <div className={childrenClasses}>{children}</div> : null}
        {bottomBand}
      </div>
    );
  }

  return (
    <div
      className={[
        containerClasses,
        isClickable ? `cursor-pointer ${focusClasses}` : '',
      ].join(' ')}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <CardImage image={image} title={title} />
      <div className={textClasses}>
        {textContent}
        {children ? (
          <div
            className={
              childrenClassName ||
              'flex flex-wrap items-center gap-[var(--space-sm)] mt-[var(--space-xs)]'
            }
          >
            {children}
          </div>
        ) : null}
      </div>
      {bottomBand}
    </div>
  );
}
