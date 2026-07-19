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
 * Product card with image, description, physical specs (color/size), and buy buttons.
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

  return (
    <Card
      title={displayName}
      description={product.description}
      image={product.image}
      onClick={handleCardClick}
      titleClassName="font-display text-[var(--text-heading-md)] font-bold text-[var(--color-brand-purple-750)] text-center"
      descriptionClassName="text-center"
      childrenClassName="mt-auto flex flex-col gap-[var(--space-sm)]"
    >
      <p className="text-center text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]">
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
