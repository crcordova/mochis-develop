import type { Metadata } from 'next';
import blogData from '@/data/blog.json';
import { PageBackground } from '@/components/layout';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre bienestar digital, educación y uso responsable de la IA con peluches inteligentes mochis-play.',
};

export default function BlogPage() {
  return (
    <main
      id="main-content"
      className="relative px-[var(--space-md)] py-[var(--space-3xl)]"
    >
      {/* Background image — using the hero image as a placeholder until page-specific images are ready. */}
      <PageBackground imageSrc="/images/hero/hero-home.webp" overlay="hero" washOpacity={80} />

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-[var(--space-2xl)]">
          <h1 className="text-[var(--text-heading-xl)] font-[var(--font-weight-bold)] text-[var(--color-text)] mb-[var(--space-sm)]">
            Blog
          </h1>
          <p className="text-[var(--text-body-lg)] text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Artículos sobre bienestar digital, educación y uso responsable de la
            IA con peluches inteligentes.
          </p>
        </header>

        <BlogClient posts={blogData.posts} categories={blogData.categories} />
      </div>
    </main>
  );
}
