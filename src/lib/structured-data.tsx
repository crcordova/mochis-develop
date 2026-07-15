import siteData from '@/data/site.json';

/**
 * Product interface matching the structure in products.json.
 */
export interface Product {
  id: string;
  name: string | null;
  color: string;
  image: string;
  description: string;
  features: string[];
}

/**
 * Generates Schema.org Organization JSON-LD from site.json data.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.site.name,
    url: siteData.site.url,
    description: siteData.site.description,
    sameAs: [
      siteData.social.instagram,
      siteData.social.tiktok,
      siteData.social.youtube,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteData.contact.email,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

/**
 * Generates Schema.org ItemList JSON-LD for a list of products.
 * Handles edge cases: null name → fallback, missing image → omit field.
 */
export function generateProductSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => {
      const item: Record<string, unknown> = {
        '@type': 'Product',
        name: product.name || `Peluche ${product.color}`,
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: siteData.site.name,
        },
        category: 'Peluches con IA',
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'CLP',
          price: '0',
          url: siteData.site.url + '/tienda',
        },
      };

      // Only include image if present (avoid undefined in JSON-LD)
      if (product.image) {
        item.image = `${siteData.site.url}${product.image}`;
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        item,
      };
    }),
  };
}

/**
 * Renders a JSON-LD script tag. Uses dangerouslySetInnerHTML with JSON.stringify only.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
