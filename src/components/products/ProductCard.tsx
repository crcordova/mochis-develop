'use client';

import { useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BuyButtons } from './BuyButtons';
import { trackProductView } from '@/lib/analytics';

type BadgeVariant = 'mochis' | 'gatos' | 'ponejos' | 'default';

interface ProductData {
  id: string;
  name: string | null;
  color: string;
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
 * Product card with image, description, category badge, feature tags, and buy buttons.
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

  const badgeVariant = (
    ['mochis', 'gatos', 'ponejos'].includes(category) ? category : 'default'
  ) as BadgeVariant;

  return (
    <Card
      title={displayName}
      description={product.description}
      image={product.image}
      onClick={handleCardClick}
      childrenClassName="mt-auto flex flex-col gap-[var(--space-sm)]"
    >
      <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
        <Badge variant={badgeVariant} label={categoryName} />
        {product.features.map((feature) => (
          <span
            key={feature}
            className={[
              'inline-flex items-center',
              'px-[var(--space-sm)] py-[var(--space-xs)]',
              'rounded-[var(--radius-badge)]',
              'text-[var(--font-size-xs)]',
              'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]',
              'font-[var(--font-weight-medium)]',
              'leading-[var(--line-height-tight)]',
              'whitespace-nowrap',
            ].join(' ')}
          >
            {feature}
          </span>
        ))}
      </div>

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
