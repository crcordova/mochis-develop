'use client';

import { useCallback } from 'react';
import { trackBuyMLClick, trackEvent } from '@/lib/analytics';

interface CategoryBuyButtonsProps {
  categoryId: string;
  categoryName: string;
  mlUrl: string | null;
  whatsappUrl: string | null;
}

const BASE_CLASSES = [
  'inline-flex items-center justify-center',
  'rounded-md font-semibold',
  'transition-colors duration-base',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2',
  'disabled:opacity-50 disabled:pointer-events-none',
  'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
].join(' ');

const PRIMARY_CLASSES = [
  BASE_CLASSES,
  'bg-primary text-[var(--color-text-inverse)]',
  'hover:bg-[var(--color-primary-hover)]',
  'active:bg-[var(--color-primary-active)]',
  'cursor-pointer',
].join(' ');

const OUTLINE_CLASSES = [
  BASE_CLASSES,
  'border-2 border-[var(--color-whatsapp)] text-[var(--color-whatsapp-text)] bg-transparent',
  'hover:bg-[var(--color-whatsapp-subtle)]',
  'active:bg-[var(--color-whatsapp-100)]',
  'cursor-pointer',
].join(' ');

const DISABLED_CLASSES = [
  BASE_CLASSES,
  'opacity-50 pointer-events-none cursor-default',
  'bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]',
].join(' ');

/**
 * Category-level buy buttons: MercadoLibre (category) and WhatsApp (category inquiry).
 * Uses native anchors for external URLs with tracking on click.
 */
export function CategoryBuyButtons({
  categoryId,
  categoryName,
  mlUrl,
  whatsappUrl,
}: CategoryBuyButtonsProps) {
  const handleMLClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      trackBuyMLClick(categoryId, categoryName);
    },
    [categoryId, categoryName]
  );

  const handleWhatsAppClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      trackEvent({
        action: 'buy_whatsapp_category_click',
        category: 'purchase',
        label: categoryName,
        value: { category: categoryId, category_name: categoryName },
      });
    },
    [categoryId, categoryName]
  );

  return (
    <div className="flex flex-wrap justify-center gap-[var(--space-md)]">
      {mlUrl ? (
        <a
          href={mlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={PRIMARY_CLASSES}
          onClick={handleMLClick}
        >
          Comprar en MercadoLibre
        </a>
      ) : (
        <span className={DISABLED_CLASSES} aria-disabled="true">
          MercadoLibre no disponible
        </span>
      )}

      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={OUTLINE_CLASSES}
          onClick={handleWhatsAppClick}
        >
          Consultar por WhatsApp
        </a>
      ) : (
        <span className={DISABLED_CLASSES} aria-disabled="true">
          WhatsApp no disponible
        </span>
      )}
    </div>
  );
}
