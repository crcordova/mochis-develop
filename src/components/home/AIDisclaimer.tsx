import siteData from '@/data/site.json';

/**
 * AIDisclaimer — Compact collapsible disclaimer about the AI.
 *
 * Server component (no 'use client'). Uses native HTML <details> for
 * keyboard accessibility (Tab to focus summary, Enter/Space to toggle)
 * and automatic prefers-reduced-motion support (no JS animation).
 *
 * Collapsed: ~52px tall (summary row only: 20px icon + 16px padding top/bottom).
 * Expanded:  ~150-220px tall (summary + paragraph with relaxed line-height).
 */
export function AIDisclaimer() {
  return (
    <section
      aria-label="Información sobre IA"
      className="py-[var(--space-md)] px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)]"
    >
      <details className="max-w-3xl mx-auto bg-[var(--color-bg-card)] border border-[var(--color-warning)]/40 rounded-[var(--radius-card)] shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)] overflow-hidden group">
        <summary className="flex items-center gap-[var(--space-sm)] cursor-pointer list-none p-[var(--space-md)] hover:bg-[var(--color-primary-subtle)]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span className="text-[var(--text-body)] text-[var(--color-text-secondary)] font-[var(--font-weight-medium)]">
            Sobre la IA
          </span>
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-auto text-[var(--color-text-muted)] transition-transform group-open:rotate-180"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="px-[var(--space-md)] pb-[var(--space-md)] text-[var(--text-body-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">
          {siteData.disclaimer.full}
        </div>
      </details>
    </section>
  );
}
