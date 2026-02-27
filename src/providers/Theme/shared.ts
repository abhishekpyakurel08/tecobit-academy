import type { ResolvedTheme, Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

/** Default preference when no preference has been saved. */
export const defaultTheme: Theme = 'system'

/**
 * Read the OS colour-scheme preference.
 * Returns 'dark' or 'light' — never 'system'.
 */
export const getImplicitPreference = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Resolve the stored preference to an actual 'dark' | 'light' value
 * that can be applied to data-theme.
 */
export const resolveTheme = (preference: Theme): ResolvedTheme => {
  if (preference === 'system') return getImplicitPreference()
  return preference
}
