interface SurfacePanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A raised surface with the same visual treatment as the site header/footer:
 * a light background, a subtle purple shadow, and a soft purple transition
 * band at the bottom that blends it into the page's purple background.
 */
export function SurfacePanel({ children, className = '' }: SurfacePanelProps) {
  return (
    <div
      className={[
        'relative overflow-hidden',
        'bg-[var(--color-bg-elevated)]',
        'rounded-[var(--radius-card)]',
        'border border-[var(--color-border)]',
        'shadow-[0_8px_30px_-10px_rgba(120,60,165,0.20)]',
        className,
      ].join(' ')}
    >
      {children}

      {/* Bottom transition band — blends the panel into the purple page background. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-[var(--color-bg-elevated)] to-[rgba(120,60,165,0.25)]"
      />
    </div>
  );
}
