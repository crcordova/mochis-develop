'use client';

import { useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { BuyButtons } from './BuyButtons';
import { trackProductView } from '@/lib/analytics';

interface ProductData {
  id: string;
  name: string | null;
  color: string;
  size: string;
  image: string;
  description: string;
  features: string[];
}

interface ProductCardProps {
  product: ProductData;
  displayName: string;
  category: string;
  categoryName: string;
  mlUrl: string | null;
  whatsappUrl: string | null;
}

/**
 * Returns the category detail page href for clickable product cards.
 */
function getCategoryHref(category: string): string | undefined {
  if (category === 'mochis' || category === 'ponejos') {
    return `/tienda/${category}`;
  }
  return undefined;
}

/**
 * Product card with image, description, physical specs (color/size), and buy buttons.
 *
 * Clicking the image or text navigates to the category detail page for mochis or ponejos.
 * Buy buttons remain interactive and do not trigger navigation.
 *
 * Tracking: fires `product_view` via onClick (not Card's trackingId prop) because
 * the event name and payload differ from Card's generic `card_click` event.
 */
export function ProductCard({
  product,
  displayName,
  category,
  categoryName,
  mlUrl,
  whatsappUrl,
}: ProductCardProps) {
  const handleCardClick = useCallback(() => {
    trackProductView(product.id, displayName, category);
  }, [product.id, displayName, category]);

  const href = getCategoryHref(category);

  return (
    <Card
      href={href}
      title={displayName}
      description={product.description}
      image={product.image}
      onClick={handleCardClick}
      contentClassName="p-2 sm:p-[var(--space-md)] gap-[var(--space-xs)] sm:gap-[var(--space-sm)]"
      titleClassName="font-display text-[var(--text-body-xl)] sm:text-[var(--text-heading-md)] font-bold text-[var(--color-brand-purple-750)] text-center"
      descriptionClassName="text-center text-[var(--text-body-sm)] line-clamp-2 hidden sm:block"
      childrenClassName="p-2 sm:p-[var(--space-md)] mt-auto flex flex-col gap-[var(--space-xs)] sm:gap-[var(--space-sm)]"
    >
      <p className="text-center text-xs sm:text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]">
        Color {product.color} · Tamaño {product.size}
      </p>

      <BuyButtons
        mlUrl={mlUrl}
        whatsappUrl={whatsappUrl}
        productId={product.id}
        productName={displayName}
        category={category}
        categoryName={categoryName}
      />
    </Card>
  );
}
