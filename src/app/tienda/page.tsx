import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { getMLUrl, buildWhatsAppUrl, getProductDisplayName } from '@/lib/purchase';
import { generateProductSchema, JsonLd } from '@/lib/structured-data';
import { TiendaClient } from './TiendaClient';

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Catálogo de peluches inteligentes mochis-play con IA integrada.',
};

/**
 * Server page: pre-builds all URLs from env vars, then delegates to client component.
 */
const SHOP_CATEGORIES = productsData.categories.filter((cat) => cat.id !== 'gatos');

export default function TiendaPage() {
  const categories = SHOP_CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));

  // Flatten shop products for structured data (JSON-LD)
  const allProducts = SHOP_CATEGORIES.flatMap((cat) =>
    cat.products.map((product) => ({
      id: product.id,
      name: product.name,
      color: product.color,
      image: product.image,
      description: product.description,
      features: product.features,
    }))
  );

  const productsWithUrls = SHOP_CATEGORIES.flatMap((cat) => {
    const mlUrl = getMLUrl(cat.id);

    return cat.products.map((product) => {
      const displayName = getProductDisplayName({
        name: product.name,
        color: product.color,
        categoryId: cat.id,
      });

      const whatsappUrl = buildWhatsAppUrl({
        id: product.id,
        displayName,
        category: cat.name.toLowerCase(),
        color: product.color,
      });

      return {
        id: product.id,
        name: product.name,
        color: product.color,
        image: product.image,
        description: product.description,
        features: product.features,
        displayName,
        category: cat.id,
        categoryName: cat.name,
        mlUrl,
        whatsappUrl,
      };
    });
  });

  return (
    <main id="main-content" className="px-4 py-[var(--space-2xl)] max-w-7xl mx-auto">
      <JsonLd data={generateProductSchema(allProducts)} />
      <div className="text-center mb-[var(--space-xl)]">
        <h1 className="font-display text-[var(--text-heading-lg)] font-bold text-[var(--color-text)]">
          Tienda
        </h1>
        <p className="mt-[var(--space-sm)] text-[var(--text-body)] text-[var(--color-text-secondary)]">
          Elige tu peluche inteligente con IA integrada
        </p>
      </div>

      <TiendaClient products={productsWithUrls} categories={categories} />
    </main>
  );
}
