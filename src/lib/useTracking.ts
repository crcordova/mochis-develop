'use client';

import { useCallback } from 'react';
import {
  trackEvent,
  trackProductView as trackProductViewBase,
  trackBuyMLClick as trackBuyMLClickBase,
  trackBuyWhatsAppClick as trackBuyWhatsAppClickBase,
  trackNavClick as trackNavClickBase,
  trackTutorialClick as trackTutorialClickBase,
} from '@/lib/analytics';

const isDev = process.env.NODE_ENV === 'development';

export function useTracking() {
  const trackProductView = useCallback(
    (productId: string, productName: string, category: string) => {
      if (isDev) {
        console.log('[tracking] product_view', { productId, productName, category });
      }
      trackProductViewBase(productId, productName, category);
    },
    [],
  );

  const trackBuyMLClick = useCallback(
    (category: string, categoryName: string) => {
      if (isDev) {
        console.log('[tracking] buy_ml_click', { category, categoryName });
      }
      trackBuyMLClickBase(category, categoryName);
    },
    [],
  );

  const trackBuyWhatsAppClick = useCallback(
    (productId: string, productName: string, category: string) => {
      if (isDev) {
        console.log('[tracking] buy_whatsapp_click', { productId, productName, category });
      }
      trackBuyWhatsAppClickBase(productId, productName, category);
    },
    [],
  );

  const trackNavClick = useCallback(
    (destination: string) => {
      if (isDev) {
        console.log('[tracking] nav_click', { destination });
      }
      trackNavClickBase(destination);
    },
    [],
  );

  const trackTutorialClick = useCallback(
    (videoId: string, title: string) => {
      if (isDev) {
        console.log('[tracking] tutorial_click', { videoId, title });
      }
      trackTutorialClickBase(videoId, title);
    },
    [],
  );

  const trackCustom = useCallback(
    (eventName: string, eventData?: Record<string, string | number | boolean>) => {
      if (isDev) {
        console.log('[tracking]', eventName, eventData);
      }
      trackEvent({
        action: eventName,
        category: 'custom',
        value: eventData,
      });
    },
    [],
  );

  return {
    trackProductView,
    trackBuyMLClick,
    trackBuyWhatsAppClick,
    trackNavClick,
    trackTutorialClick,
    trackCustom,
  };
}
