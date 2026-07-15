'use client';

import { useCallback } from 'react';
import { trackBuyMLClick, trackBuyWhatsAppClick } from '@/lib/analytics';

interface BuyButtonsProps {
  mlUrl: string | null;
  whatsappUrl: string | null;
  productId: string;
  productName: string;
  category: string;
  categoryName: string;
}

const BASE_CLASSES = [
  'inline-flex items-center justify-center',
  'rounded-md font-semibold',
  'transition-colors duration-base',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2',
  'disabled:opacity-50 disabled:pointer-events-none',
  'px-3 py-1.5 text-sm',
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
 * Buy buttons for a product: MercadoLibre (by category) and WhatsApp (by product).
 * Uses native <a> tags for external URLs with tracking on click.
 */
export function BuyButtons({
  mlUrl,
  whatsappUrl,
  productId,
  productName,
  category,
  categoryName,
}: BuyButtonsProps) {
  const handleMLClick = useCallback(() => {
    trackBuyMLClick(category, categoryName);
  }, [category, categoryName]);

  const handleWhatsAppClick = useCallback(() => {
    trackBuyWhatsAppClick(productId, productName, category);
  }, [productId, productName, category]);

  return (
    <div className="flex flex-col sm:flex-row gap-[var(--space-sm)] w-full">
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
          Comprar por WhatsApp
        </a>
      ) : (
        <span className={DISABLED_CLASSES} aria-disabled="true">
          WhatsApp no disponible
        </span>
      )}
    </div>
  );
}
