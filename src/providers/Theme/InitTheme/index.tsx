import Script from 'next/script'
import React from 'react'

/**
 * InitTheme – runs BEFORE React hydrates (strategy="beforeInteractive").
 *
 * Reads the saved preference from localStorage:
 *   'dark'   → apply dark immediately
 *   'light'  → apply light immediately
 *   'system' → resolve from prefers-color-scheme
 *   missing  → treat as 'system'
 *
 * This prevents the flash of wrong theme (FOWT) on every hard-reload.
 */
export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  var key = 'payload-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var stored = null;
  try { stored = window.localStorage.getItem(key); } catch (e) {}

  var theme;
  if (stored === 'dark' || stored === 'light') {
    theme = stored;
  } else if (stored === 'system' || stored === null || stored === undefined) {
    theme = getSystemTheme();
    // If nothing stored, persist 'system' so next load knows the intent
    if (!stored) {
      try { window.localStorage.setItem(key, 'system'); } catch (e) {}
    }
  } else {
    theme = getSystemTheme();
  }

  document.documentElement.setAttribute('data-theme', theme);

  // Live-update when OS changes AND preference is 'system'
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var current;
      try { current = window.localStorage.getItem(key); } catch (ex) {}
      if (current === 'system' || !current) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) {}
})();
        `,
      }}
    />
  )
}
