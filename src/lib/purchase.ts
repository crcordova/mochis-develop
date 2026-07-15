/**
 * Server-side purchase utilities.
 * Reads env vars for MercadoLibre URLs and WhatsApp.
 * Must NOT be imported in client components (uses process.env server-only).
 */

const ML_URL_MAP: Record<string, string> = {
  uwus: 'ML_UWUS_URL',
  gatos: 'ML_GATOS_URL',
  pifos: 'ML_PIFOS_URL',
};

/**
 * Returns the MercadoLibre URL for a given category, or null if not configured.
 */
export function getMLUrl(categoryId: string): string | null {
  const envVar = ML_URL_MAP[categoryId];
  if (!envVar) return null;

  const url = process.env[envVar];
  if (!url || url.trim() === '') return null;

  return url.trim();
}

/**
 * Builds a WhatsApp deep-link URL for a specific product.
 * Returns null if WHATSAPP_NUMBER is not configured.
 */
export function buildWhatsAppUrl(product: {
  id: string;
  displayName: string;
  category: string;
  color: string;
}): string | null {
  const number = process.env.WHATSAPP_NUMBER;
  if (!number || number.trim() === '') return null;

  const message = `Hola! Me interesa ${product.displayName} (${product.category} ${product.color})`;
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${number.trim()}?text=${encoded}`;
}

/**
 * Returns a human-readable display name for a product.
 * Falls back to "{Category} {color}" when name is null/empty.
 */
export function getProductDisplayName(product: {
  name: string | null;
  color: string;
  categoryId: string;
}): string {
  if (product.name && product.name.trim() !== '') {
    return product.name.trim();
  }

  const categoryLabel =
    product.categoryId === 'gatos'
      ? 'Gatito'
      : product.categoryId === 'pifos'
        ? 'Pifo'
        : product.categoryId;

  return `${categoryLabel} ${product.color}`;
}
