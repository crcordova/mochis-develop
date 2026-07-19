'use client';

import Link from 'next/link';
import siteData from '@/data/site.json';
import { NAV_LINKS } from '@/data/navigation';
import { trackEvent } from '@/lib/analytics';
import type { TrackingEvent } from '@/lib/analytics';

const SOCIAL_LINKS = [
  { href: siteData.social.instagram, label: 'Instagram', platform: 'instagram' },
  { href: siteData.social.tiktok, label: 'TikTok', platform: 'tiktok' },
  { href: siteData.social.youtube, label: 'YouTube', platform: 'youtube' },
] as const;

function trackFooterNavClick(destination: string) {
  const event: TrackingEvent = {
    action: 'nav_click',
    category: 'navigation',
    label: `footer_${destination}`,
    value: { destination, source: 'footer' },
  };
  trackEvent(event);
}

function trackSocialClick(platform: string, href: string) {
  const event: TrackingEvent = {
    action: 'social_click',
    category: 'social',
    label: platform,
    value: { platform, destination: href },
  };
  trackEvent(event);
}

export function Footer() {
  const { site, disclaimer, social, contact } = siteData;

  return (
    <footer
      className="relative bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]"
      role="contentinfo"
    >
      {/* Purple-tinted transition band between page content and gray footer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[rgba(120,60,165,0.30)] to-transparent"
      />
      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12">
        {/* Main grid: 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="font-display text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-text-link)] transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 rounded-sm"
              onClick={() => trackFooterNavClick('home')}
            >
              {site.name}
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
              {site.description}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <nav aria-label="Navegación del footer">
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide mb-4">
              Navegación
            </h2>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link-hover)] hover:underline transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 rounded-sm"
                    onClick={() => trackFooterNavClick(link.label.toLowerCase())}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Social & Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide">
              Redes y contacto
            </h2>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link-hover)] hover:underline transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 rounded-sm"
                    onClick={() => trackSocialClick(link.platform, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link-hover)] hover:underline transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 rounded-sm"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section: Disclaimer + Copyright */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {disclaimer.short}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2026 {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
