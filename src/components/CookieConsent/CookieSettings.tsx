'use client';

import { useState } from 'react';

import Icon from '@/components/Icon';

import {
  useCookieConsent,
  CookiePreferences,
} from '@/contexts/CookieConsentContext';

import styles from './CookieSettings.module.scss';

const COOKIE_CATEGORIES = [
  {
    key: 'essential' as const,
    title: 'Essential Cookies',
    description:
      'These cookies are necessary for the website to function and cannot be switched off.',
    required: true,
  },
  {
    key: 'analytics' as const,
    title: 'Analytics Cookies',
    description:
      'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    required: false,
  },
  {
    key: 'marketing' as const,
    title: 'Marketing Cookies',
    description:
      'These cookies are used to track visitors across websites to display relevant advertisements.',
    required: false,
  },
  {
    key: 'preferences' as const,
    title: 'Preference Cookies',
    description:
      'These cookies allow the website to remember choices you make and provide enhanced features.',
    required: false,
  },
];

export default function CookieSettings() {
  const { showingSettings, preferences, acceptSelected, hideSettings } =
    useCookieConsent();
  const [tempPreferences, setTempPreferences] =
    useState<CookiePreferences>(preferences);

  if (!showingSettings) return null;

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return;

    setTempPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    acceptSelected(tempPreferences);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cookie Settings</h2>
          <button
            className={styles.closeButton}
            onClick={hideSettings}
            aria-label='Close cookie settings'
          >
            <Icon icon='close' />
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            Manage your cookie preferences below. You can enable or disable
            different types of cookies to control how we collect and use your
            data.
          </p>

          <div className={styles.categories}>
            {COOKIE_CATEGORIES.map((category) => (
              <div key={category.key} className={styles.category}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryInfo}>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <p className={styles.categoryDescription}>
                      {category.description}
                    </p>
                  </div>
                  <div className={styles.toggle}>
                    <input
                      type='checkbox'
                      id={category.key}
                      checked={tempPreferences[category.key]}
                      onChange={() => handleToggle(category.key)}
                      disabled={category.required}
                      className={styles.toggleInput}
                    />
                    <label
                      htmlFor={category.key}
                      className={`${styles.toggleLabel} ${category.required ? styles.disabled : ''}`}
                      aria-label={`Toggle ${category.title}`}
                    >
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={hideSettings}
          >
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleSave}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
