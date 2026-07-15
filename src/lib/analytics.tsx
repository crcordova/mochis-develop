'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export function Analytics() {
  return <VercelAnalytics />;
}

export type TrackingEvent = {
  action: string;
  category: string;
  label?: string;
  value?: Record<string, string | number | boolean>;
};

export function trackEvent(event: TrackingEvent) {
  if (typeof window === 'undefined') return;

  if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      ...event.value,
    });
  }
}

export function trackProductView(productId: string, productName: string, category: string) {
  trackEvent({
    action: 'product_view',
    category: 'products',
    label: productName,
    value: { product_id: productId, product_name: productName, category },
  });
}

export function trackBuyMLClick(category: string, categoryName: string) {
  trackEvent({
    action: 'buy_ml_click',
    category: 'purchase',
    label: categoryName,
    value: { category, category_name: categoryName },
  });
}

export function trackBuyWhatsAppClick(productId: string, productName: string, category: string) {
  trackEvent({
    action: 'buy_whatsapp_click',
    category: 'purchase',
    label: productName,
    value: { product_id: productId, product_name: productName, category },
  });
}

export function trackNavClick(destination: string) {
  trackEvent({
    action: 'nav_click',
    category: 'navigation',
    label: destination,
    value: { destination },
  });
}

export function trackTutorialClick(videoId: string, title: string) {
  trackEvent({
    action: 'tutorial_click',
    category: 'tutorials',
    label: title,
    value: { video_id: videoId, title },
  });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
