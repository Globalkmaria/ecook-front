'use client';

import { useCallback } from 'react';

import { useCookieConsent } from '@/contexts/CookieConsentContext';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

export function useAnalytics() {
  const { preferences } = useCookieConsent();

  const trackEvent = useCallback(
    (eventName: string, parameters?: Record<string, unknown>) => {
      if (
        preferences.analytics &&
        typeof window !== 'undefined' &&
        window.gtag
      ) {
        window.gtag('event', eventName, parameters);
      }
    },
    [preferences.analytics],
  );

  const trackAdRecipeView = useCallback(
    (recipeId: string, adType: string) => {
      trackEvent('ad_recipe_view', {
        recipe_id: recipeId,
        ad_type: adType,
      });
    },
    [trackEvent],
  );

  const trackRecipeView = useCallback(
    (recipeId: string) => {
      trackEvent('recipe_view', {
        recipe_id: recipeId,
      });
    },
    [trackEvent],
  );

  const trackRecipeInteraction = useCallback(
    (action: string, recipeId: string) => {
      trackEvent('recipe_interaction', {
        action,
        recipe_id: recipeId,
      });
    },
    [trackEvent],
  );

  const trackRecipeSearch = useCallback(
    (searchTerm: string) => {
      trackEvent('search', {
        search_term: searchTerm,
      });
    },
    [trackEvent],
  );

  const trackRecipeShare = useCallback(
    (recipeId: string, platform: string) => {
      trackEvent('share', {
        method: platform,
        content_type: 'recipe',
        item_id: recipeId,
      });
    },
    [trackEvent],
  );

  return {
    trackEvent,
    trackAdRecipeView,
    trackRecipeView,
    trackRecipeInteraction,
    trackRecipeSearch,
    trackRecipeShare,
    canTrack: preferences.analytics,
  };
}
