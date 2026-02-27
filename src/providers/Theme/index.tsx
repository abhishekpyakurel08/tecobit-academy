'use client'

import React, { createContext, use, useCallback, useEffect, useState } from 'react'
import type { ResolvedTheme, Theme, ThemeContextType } from './types'
import { defaultTheme, resolveTheme, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

// ── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType>({
  setTheme:      () => null,
  theme:         undefined,
  resolvedTheme: undefined,
})

// ── Provider ──────────────────────────────────────────────────────────────────
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreference] = useState<Theme | undefined>(undefined)
  const [resolved,   setResolved]   = useState<ResolvedTheme | undefined>(undefined)

  /** Write data-theme, update state, persist to localStorage, smooth transition. */
  const applyTheme = useCallback((pref: Theme) => {
    const res = resolveTheme(pref)
    setPreference(pref)
    setResolved(res)

    // Add transition class before changing theme for smooth cross-fade
    document.documentElement.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', res)

    // Remove after transition completes (~350ms + buffer)
    const tid = window.setTimeout(
      () => document.documentElement.classList.remove('theme-transitioning'),
      400,
    )

    try {
      window.localStorage.setItem(themeLocalStorageKey, pref)
    } catch (_) { /* storage blocked */ }

    return () => window.clearTimeout(tid)
  }, [])

  /**
   * Public setter exposed via context.
   * Accepts Theme ('light'|'dark'|'system') OR null (→ 'system') for
   * backwards compatibility with the legacy ThemeSelector component.
   */
  const setTheme = useCallback((pref: Theme | null) => {
    applyTheme(pref ?? 'system')
  }, [applyTheme])

  // ── Hydrate from localStorage on first render ─────────────────────────────
  useEffect(() => {
    let saved: string | null = null
    try { saved = window.localStorage.getItem(themeLocalStorageKey) } catch (_) {}
    const pref: Theme = themeIsValid(saved) ? (saved as Theme) : defaultTheme
    applyTheme(pref)
  }, [applyTheme])

  // ── Live-listen to OS preference changes ──────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      let saved: string | null = null
      try { saved = window.localStorage.getItem(themeLocalStorageKey) } catch (_) {}
      // Only follow OS when user's preference is 'system' (or unset)
      if (saved === 'system' || !themeIsValid(saved)) {
        const res: ResolvedTheme = e.matches ? 'dark' : 'light'
        setResolved(res)
        document.documentElement.setAttribute('data-theme', res)
      }
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <ThemeContext value={{ theme: preference, resolvedTheme: resolved, setTheme }}>
      {children}
    </ThemeContext>
  )
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
