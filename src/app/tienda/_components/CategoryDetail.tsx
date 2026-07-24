import Image from 'next/image';
import { PageBackground } from '@/components/layout/PageBackground';
import { SurfacePanel } from '@/components/ui/SurfacePanel';
import { CategoryBuyButtons } from './CategoryBuyButtons';

interface Product {
  id: string;
  name: string | null;
  color: string;
  size: string;
  image: string;
  description: string;
  features: string[];
  displayName: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  detailFeatures?: string[];
  detailImage?: string;
  size: string;
  mlUrl: string | null;
  whatsappUrl: string | null;
}

interface CategoryDetailProps {
  category: Category;
  products: Product[];
}

const headingTextShadow = {
  textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.35)',
};

/**
 * Category detail page layout.
 *
 * Shows the category hero with background image, long description, feature list,
 * and a product gallery. Purchase buttons are rendered as a client component so
 * tracking and external links work correctly.
 */
export function CategoryDetail({ category, products }: CategoryDetailProps) {
  return (
    <div className="relative">
      <PageBackground
        imageSrc={category.detailImage || '/images/tienda/tienda-bg.webp'}
        alt=""
        overlay="shop"
        washOpacity={70}
      />

      <div className="relative z-10 px-4 py-[var(--space-2xl)] max-w-7xl mx-auto">
        {/* Hero header */}
        <div className="text-center mb-[var(--space-2xl)]">
          <h1
            className="font-balloon text-[length:var(--text-display)] sm:text-[length:var(--text-display-xl)] font-bold text-[var(--color-text-inverse)]"
            style={headingTextShadow}
          >
            {category.name}
          </h1>
          <p
            className="mt-[var(--space-md)] max-w-3xl mx-auto text-[length:var(--text-body-xl)] leading-[var(--line-height-relaxed)] text-[var(--color-text-inverse)] opacity-95"
            style={headingTextShadow}
          >
            {category.description}
          </p>
          {category.longDescription ? (
            <p className="mt-[var(--space-lg)] max-w-3xl mx-auto text-[length:var(--text-body)] text-[var(--color-text-inverse)] opacity-90">
              {category.longDescription}
            </p>
          ) : null}

          <div className="mt-[var(--space-xl)]">
            <CategoryBuyButtons
              categoryId={category.id}
              categoryName={category.name}
              mlUrl={category.mlUrl}
              whatsappUrl={category.whatsappUrl}
            />
          </div>
        </div>

        {/* Features */}
        {category.detailFeatures && category.detailFeatures.length > 0 ? (
          <section
            aria-labelledby={`${category.id}-features-heading`}
            className="mb-[var(--space-2xl)]"
          >
            <h2
              id={`${category.id}-features-heading`}
              className="font-display text-[length:var(--text-heading-lg)] font-bold text-[var(--color-text-inverse)] text-center mb-[var(--space-lg)]"
              style={headingTextShadow}
            >
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
              {category.detailFeatures.map((feature, index) => {
                // Split title and body on the first colon, if present.
                const [featureTitle, featureBody] = feature.includes(':')
                  ? feature.split(/:(.*)/, 2)
                  : [feature, ''];

                return (
                  <SurfacePanel
                    key={index}
                    className="p-[var(--space-md)] sm:p-[var(--space-lg)]"
                  >
                    <h3 className="text-[length:var(--text-heading-sm)] font-bold text-[var(--color-brand-purple-750)] mb-[var(--space-sm)]">
                      {featureTitle.trim()}
                    </h3>
                    {featureBody ? (
                      <p className="text-[length:var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]">
                        {featureBody.trim()}
                      </p>
                    ) : null}
                  </SurfacePanel>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Product gallery */}
        <section aria-labelledby={`${category.id}-products-heading`}>
          <h2
            id={`${category.id}-products-heading`}
            className="font-display text-[length:var(--text-heading-lg)] font-bold text-[var(--color-text-inverse)] text-center mb-[var(--space-lg)]"
            style={headingTextShadow}
          >
            Conoce a los {category.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--space-md)]">
            {products.map((product) => (
              <SurfacePanel
                key={product.id}
                className="flex flex-col overflow-hidden"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.displayName}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-[var(--space-md)] flex flex-col flex-grow gap-[var(--space-sm)]">
                  <h3 className="text-[length:var(--text-heading-sm)] font-bold text-[var(--color-brand-purple-750)] text-center">
                    {product.displayName}
                  </h3>
                  <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] text-center line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-muted)] text-center mt-auto">
                    Color {product.color} · Tamaño {product.size}
                  </p>
                </div>
              </SurfacePanel>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-[var(--space-2xl)] text-center">
          <CategoryBuyButtons
            categoryId={category.id}
            categoryName={category.name}
            mlUrl={category.mlUrl}
            whatsappUrl={category.whatsappUrl}
          />
        </div>
      </div>
    </div>
  );
}
