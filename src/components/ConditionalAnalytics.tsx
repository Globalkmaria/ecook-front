'use client';

import { useEffect, useState } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';

import { useCookieConsent } from '@/contexts/CookieConsentContext';

const GA_ID = 'G-P19WFDWFQH';

export const COOKIE_CHANGE_EVENT = 'cookieConsentChanged';

export default function ConditionalAnalytics() {
  const { preferences, hasConsented } = useCookieConsent();
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    if (hasConsented && preferences.analytics) {
      setShouldLoadAnalytics(true);
    } else {
      setShouldLoadAnalytics(false);
    }
  }, [hasConsented, preferences.analytics]);

  useEffect(() => {
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail.analytics) {
        setShouldLoadAnalytics(true);
      }
    };

    window.addEventListener(
      COOKIE_CHANGE_EVENT,
      handleConsentChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        COOKIE_CHANGE_EVENT,
        handleConsentChange as EventListener,
      );
    };
  }, []);

  if (!shouldLoadAnalytics) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
}
