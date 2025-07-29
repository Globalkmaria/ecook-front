'use client';

import { useCookieConsent } from '@/contexts/CookieConsentContext';

import styles from './CookieBanner.module.scss';

export default function CookieBanner() {
  const { showBanner, acceptAll, showSettings } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h3 className={styles.title}>🍪 We use cookies</h3>
            <p className={styles.description}>
              {`We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking "Accept
              All", you consent to our use of cookies.`}
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.buttonOutline}`}
              onClick={showSettings}
            >
              Customize
            </button>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={acceptAll}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
