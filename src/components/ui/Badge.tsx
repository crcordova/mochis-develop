type BadgeVariant = 'uwus' | 'gatos' | 'pifos' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  uwus: 'bg-[var(--color-category-uwus-bg)] text-[var(--color-category-uwus-text)]',
  gatos: 'bg-[var(--color-category-gatos-bg)] text-[var(--color-category-gatos-text)]',
  pifos: 'bg-[var(--color-category-pifos-bg)] text-[var(--color-category-pifos-text)]',
  default: 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]',
};

/**
 * Small pill-shaped label for product categories.
 * Colors reference design tokens from tokens.css.
 */
export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'px-[var(--space-sm)] py-[var(--space-xs)]',
        'rounded-[var(--radius-badge)]',
        'text-[var(--text-body-sm)] font-[var(--font-weight-medium)]',
        'leading-[var(--line-height-tight)]',
        'whitespace-nowrap select-none',
        VARIANT_STYLES[variant],
        className,
      ].join(' ')}
    >
      {label}
    </span>
  );
}
