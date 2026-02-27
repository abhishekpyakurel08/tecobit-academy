// ── Theme types ────────────────────────────────────────────────────────────
// 'light'  → always light
// 'dark'   → always dark
// 'system' → follow OS prefers-color-scheme (resolves to 'light' or 'dark')

export type Theme = 'dark' | 'light' | 'system'

/** The theme value stored in localStorage / selected by the user. */
export type ThemePreference = Theme

/** The actual applied theme on the document (never 'system'). */
export type ResolvedTheme = 'dark' | 'light'

export interface ThemeContextType {
  /** The user's saved preference ('light' | 'dark' | 'system'). */
  theme: Theme | undefined
  /** The actual resolved theme applied to the document. */
  resolvedTheme: ResolvedTheme | undefined
  /** Set the user's preference; pass null to reset to 'system'. */
  setTheme: (theme: Theme) => void
}

export function themeIsValid(value: null | string): value is Theme {
  return value ? ['dark', 'light', 'system'].includes(value) : false
}
