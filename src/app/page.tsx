import { FeaturesShowcase } from '@/components/home/Features';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryPreview } from '@/components/home/CategoryPreview';
import { AIDisclaimer } from '@/components/home/AIDisclaimer';

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Showcase — full-screen scroll-driven backgrounds with crossfade */}
      <FeaturesShowcase />

      {/* Category Preview Section */}
      <CategoryPreview />

      {/* AI Disclaimer Section */}
      <AIDisclaimer />
    </main>
  );
}
