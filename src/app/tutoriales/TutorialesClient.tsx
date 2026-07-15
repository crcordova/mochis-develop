'use client';

import { useMemo } from 'react';
import { Card, Badge } from '@/components/ui';
import { useTracking } from '@/lib/useTracking';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  youtube_url: string;
  category: string;
  order: number;
  duration: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface TutorialesClientProps {
  tutorials: Tutorial[];
  categories: Category[];
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

/**
 * Client component that groups tutorials by category and renders them as
 * clickable cards. Clicking a card opens the YouTube video in a new tab.
 */
export function TutorialesClient({ tutorials, categories }: TutorialesClientProps) {
  const { trackTutorialClick } = useTracking();

  // Group tutorials by category, sorted by order. Skip categories with no tutorials.
  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({
        category: cat,
        items: tutorials
          .filter((t) => t.category === cat.id)
          .sort((a, b) => a.order - b.order),
      }))
      .filter((group) => group.items.length > 0);
  }, [tutorials, categories]);

  const handleTutorialClick = (tutorial: Tutorial) => {
    trackTutorialClick(tutorial.youtube_id, tutorial.title);
    if (tutorial.youtube_url) {
      window.open(tutorial.youtube_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col gap-[var(--space-2xl)]">
      {grouped.map(({ category, items }) => (
        <section
          key={category.id}
          aria-labelledby={`category-${category.id}`}
          className="border-t border-[var(--color-border-subtle)] pt-[var(--space-2xl)] first:border-t-0 first:pt-0"
        >
          {/* Category header */}
          <div className="mb-[var(--space-lg)]">
            <h2
              id={`category-${category.id}`}
              className="text-[var(--text-heading-md)] font-[var(--font-weight-semibold)] text-[var(--color-text)] leading-[var(--line-height-tight)]"
            >
              {category.name}
            </h2>
            <p className="mt-[var(--space-xs)] text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--line-height-normal)]">
              {category.description}
            </p>
          </div>

          {/* Tutorial grid — 1 col mobile, 2 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
            {items.map((tutorial) => (
              <Card
                key={tutorial.id}
                title={tutorial.title}
                description={tutorial.description}
                onClick={() => handleTutorialClick(tutorial)}
                trackingId={tutorial.id}
                trackingData={{ video_id: tutorial.youtube_id, title: tutorial.title }}
              >
                <Badge label={`${tutorial.duration} min`} />
                <span className="inline-flex items-center gap-[var(--space-xs)] text-[var(--text-body-sm)] font-[var(--font-weight-medium)] text-[var(--color-primary)]">
                  <PlayIcon />
                  Ver en YouTube
                  <span className="sr-only">(abre en nueva pestaña)</span>
                </span>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
