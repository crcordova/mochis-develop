import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { getMLUrl, buildWhatsAppUrl, getProductDisplayName } from '@/lib/purchase';
import { generateProductSchema, JsonLd } from '@/lib/structured-data';
import { CategoryDetail } from '../_components/CategoryDetail';

export const metadata: Metadata = {
  title: 'Mochis',
  description:
    'Peluches con cara, los más grandes. 5 personalidades únicas con IA integrada para aprender, jugar y hacer compañía.',
};

const CATEGORY_ID = 'mochis';

export default function MochisPage() {
  const category = productsData.categories.find((cat) => cat.id === CATEGORY_ID);
  if (!category) {
    notFound();
  }

  const mlUrl = getMLUrl(category.id);

  // Use the first product as a representative for the WhatsApp inquiry CTA.
  const representativeProduct = category.products[0];
  const whatsappUrl = buildWhatsAppUrl({
    id: category.id,
    displayName: category.name,
    category: category.name.toLowerCase(),
    color: representativeProduct.color,
  });

  const products = category.products.map((product) => ({
    ...product,
    displayName: getProductDisplayName({
      name: product.name,
      color: product.color,
      categoryId: category.id,
    }),
    size: category.size,
  }));

  return (
    <main id="main-content">
      <JsonLd data={generateProductSchema(products)} />
      <CategoryDetail
        category={{
          id: category.id,
          name: category.name,
          description: category.description,
          longDescription: category.longDescription,
          detailFeatures: category.detailFeatures,
          detailImage: category.detailImage,
          size: category.size,
          mlUrl,
          whatsappUrl,
        }}
        products={products}
      />
    </main>
  );
}
