'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { COOKIE_CHANGE_EVENT } from '@/components/ConditionalAnalytics';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelected: (preferences: CookiePreferences) => void;
  showSettings: () => void;
  hideSettings: () => void;
  showingSettings: boolean;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

const COOKIE_CONSENT_KEY = 'ecook-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'ecook-cookie-preferences';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

const ALL_ACCEPTED: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showingSettings, setShowingSettings] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (consentStatus === 'true' && savedPreferences) {
      setHasConsented(true);
      setPreferences(JSON.parse(savedPreferences));
      setShowBanner(false);
    } else {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const saveConsent = (newPreferences: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(
      COOKIE_PREFERENCES_KEY,
      JSON.stringify(newPreferences),
    );
    setPreferences(newPreferences);
    setHasConsented(true);
    setShowBanner(false);
    setShowingSettings(false);

    if (newPreferences.analytics) {
      window.dispatchEvent(
        new CustomEvent(COOKIE_CHANGE_EVENT, {
          detail: { analytics: true },
        }),
      );
    }
  };

  const acceptAll = () => {
    saveConsent(ALL_ACCEPTED);
  };

  const acceptSelected = (selectedPreferences: CookiePreferences) => {
    saveConsent({ ...selectedPreferences, essential: true });
  };

  const showSettings = () => {
    setShowingSettings(true);
  };

  const hideSettings = () => {
    setShowingSettings(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        showBanner,
        acceptAll,
        acceptSelected,
        showSettings,
        hideSettings,
        showingSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider',
    );
  }
  return context;
}
