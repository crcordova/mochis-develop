import { Card, Badge, Button } from '@/components/ui';
import productsData from '@/data/products.json';

const uwusProduct = productsData.categories[0].products[0]; // mimi
const gatosProduct = productsData.categories[1].products[0]; // gato-negro
const pifosProduct = productsData.categories[2].products[0]; // pifo-rojo

const categoryPreviews = [
  {
    product: uwusProduct,
    badgeVariant: 'uwus' as const,
    badgeLabel: 'mochis',
    cardTitle: uwusProduct.name as string,
    trackingId: 'home_preview_mochis',
    buttonLabel: 'home_category_mochis',
    buttonText: 'Ver mochis',
    glowColor: 'var(--color-category-uwus)',
  },
  {
    product: gatosProduct,
    badgeVariant: 'gatos' as const,
    badgeLabel: 'Gatitos',
    cardTitle: `Gato ${gatosProduct.color}`,
    trackingId: 'home_preview_gatos',
    buttonLabel: 'home_category_gatos',
    buttonText: 'Ver Gatitos',
    glowColor: 'var(--color-category-gatos)',
  },
  {
    product: pifosProduct,
    badgeVariant: 'pifos' as const,
    badgeLabel: 'Pifos',
    cardTitle: `Pifo ${pifosProduct.color}`,
    trackingId: 'home_preview_pifos',
    buttonLabel: 'home_category_pifos',
    buttonText: 'Ver Pifos',
    glowColor: 'var(--color-category-pifos)',
  },
];

export function CategoryPreview() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="py-[var(--space-3xl)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="categories-heading"
          className="font-display text-[var(--text-heading-lg)] font-[var(--font-weight-bold)] text-[var(--color-text)] text-center mb-[var(--space-2xl)]"
        >
          Conoce a nuestros peluches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">
          {categoryPreviews.map((cat) => (
            <div
              key={cat.trackingId}
              className="relative flex flex-col gap-[var(--space-md)]"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-[var(--space-md)] -z-10 rounded-[var(--radius-card)] opacity-60 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${cat.glowColor} 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />
              <Card
                title={cat.cardTitle}
                description={cat.product.description}
                image={cat.product.image}
                trackingId={cat.trackingId}
                trackingData={{ category: cat.badgeLabel.toLowerCase() }}
              >
                <Badge label={cat.badgeLabel} variant={cat.badgeVariant} />
              </Card>
              <Button
                href="/tienda"
                variant="outline"
                size="sm"
                trackingLabel={cat.buttonLabel}
              >
                {cat.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
