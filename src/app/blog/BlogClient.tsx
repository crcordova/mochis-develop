'use client';

import { useMemo } from 'react';
import { Card, Badge } from '@/components/ui';
import { useTracking } from '@/lib/useTracking';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  read_time: string;
}

interface BlogCategory {
  id: string;
  name: string;
  description?: string;
}

interface BlogClientProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

/**
 * Formats an ISO date string (e.g. "2026-07-07") to a human-readable
 * Spanish format (e.g. "7 julio 2026") using es-CL locale.
 */
function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Client-side blog page: groups posts by category, renders cards with
 * tracking, formatted dates, and category badges.
 */
export function BlogClient({ posts, categories }: BlogClientProps) {
  const { trackCustom } = useTracking();

  const groupedPosts = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        posts: posts.filter((post) => post.category === category.id),
      }))
      .filter((group) => group.posts.length > 0);
  }, [posts, categories]);

  return (
    <div className="flex flex-col gap-[var(--space-2xl)]">
      {groupedPosts.map(({ category, posts: categoryPosts }) => (
        <section key={category.id} aria-labelledby={`category-${category.id}`}>
          <div className="mb-[var(--space-lg)]">
            <h2
              id={`category-${category.id}`}
              className="text-[var(--text-heading-md)] font-[var(--font-weight-semibold)] text-[var(--color-text)] mb-[var(--space-xs)]"
            >
              {category.name}
            </h2>
            {category.description ? (
              <p className="text-[var(--text-body)] text-[var(--color-text-secondary)]">
                {category.description}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
            {categoryPosts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                description={post.excerpt}
                onClick={() =>
                  trackCustom('blog_click', {
                    post_id: post.id,
                    title: post.title,
                    category: post.category,
                  })
                }
              >
                <Badge label={category.name} />
                <time
                  dateTime={post.date}
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)]"
                >
                  {formatDate(post.date)}
                </time>
                <span className="text-[var(--text-body-sm)] text-[var(--color-text-muted)]">
                  {post.read_time} lectura
                </span>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
