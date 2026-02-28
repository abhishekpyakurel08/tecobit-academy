import React from 'react'
import { themeLocalStorageKey } from '../shared'

/**
 * InitTheme – runs BEFORE React hydrates.
 *
 * Reads the saved preference from localStorage:
 *   'dark'   → apply dark immediately
 *   'light'  → apply light immediately
 *   'system' → resolve from prefers-color-scheme
 *   missing  → treat as 'system'
 *
 * This uses a standard synchronous <script> tag to prevent the flash
 * of wrong theme (FOWT) on every hard-reload.
 */
export const InitTheme: React.FC = () => {
  return (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  try {
    var key = '${themeLocalStorageKey}';
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
      // Persist 'system' flag so next load knows intent
      if (!stored) {
        try { window.localStorage.setItem(key, 'system'); } catch (e) {}
      }
    } else {
      theme = getSystemTheme();
    }
    
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
        `,
      }}
      suppressHydrationWarning
    />
  )
}
