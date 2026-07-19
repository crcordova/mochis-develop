'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/products';
import { ShopBackground } from './ShopBackground';

interface ProductWithUrls {
  id: string;
  name: string | null;
  color: string;
  size: string;
  image: string;
  description: string;
  features: string[];
  displayName: string;
  category: string;
  categoryName: string;
  mlUrl: string | null;
  whatsappUrl: string | null;
}

interface CategoryInfo {
  id: string;
  name: string;
}

interface TiendaClientProps {
  products: ProductWithUrls[];
  categories: CategoryInfo[];
}

const FILTER_OPTIONS = [
  { id: 'todos', label: 'Todos' },
  { id: 'mochis', label: 'Mochis' },
  { id: 'ponejos', label: 'Ponejos' },
];

const FILTER_BUTTON_BASE = [
  'inline-flex items-center justify-center',
  'px-4 py-2 text-sm font-semibold',
  'rounded-md',
  'transition-colors duration-base',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2',
  'cursor-pointer',
].join(' ');

const FILTER_ACTIVE_CLASSES = [
  FILTER_BUTTON_BASE,
  'bg-primary text-white',
  'hover:bg-[var(--color-primary-hover)]',
].join(' ');

const FILTER_INACTIVE_CLASSES = [
  FILTER_BUTTON_BASE,
  'border-2 border-primary text-primary bg-transparent',
  'hover:bg-primary-subtle',
].join(' ');

/**
 * Client-side tienda page with category filter and product grid.
 */
export function TiendaClient({ products, categories }: TiendaClientProps) {
  const [activeFilter, setActiveFilter] = useState('todos');

  const filteredProducts =
    activeFilter === 'todos'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="relative flex flex-col gap-[var(--space-lg)]">
      <ShopBackground />
      {/* Filter buttons */}
      <div
        className="flex flex-wrap gap-[var(--space-sm)] justify-center"
        role="group"
        aria-label="Filtrar por categoría"
      >
        {FILTER_OPTIONS.map((option) => {
          const isActive = activeFilter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={isActive ? FILTER_ACTIVE_CLASSES : FILTER_INACTIVE_CLASSES}
              onClick={() => setActiveFilter(option.id)}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            displayName={product.displayName}
            category={product.category}
            categoryName={product.categoryName}
            mlUrl={product.mlUrl}
            whatsappUrl={product.whatsappUrl}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-[var(--color-text-secondary)] py-[var(--space-xl)]">
          No hay productos en esta categoría.
        </p>
      )}
    </div>
  );
}
