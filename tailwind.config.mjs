/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    // ── Font Family ────────────────────────────────────────────────────────
    // Inter is loaded via next/font/google as --font-inter.
    // Geist (--font-geist-sans) is the secondary/code companion.
    // Full safe-fallback stack for any environment.
    fontFamily: {
      sans: [
        'var(--font-inter)',
        'Inter',
        'var(--font-geist-sans)',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      mono: [
        'var(--font-geist-mono)',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'monospace',
      ],
    },

    // ── Font Sizes – 1.25 modular scale ──────────────────────────────────
    // Each size maps to both a font-size and a sensible line-height.
    fontSize: {
      xs:   ['0.75rem',   { lineHeight: '1rem' }],        // 12px – micro labels
      sm:   ['0.875rem',  { lineHeight: '1.375rem' }],    // 14px – captions, badges
      base: ['1rem',      { lineHeight: '1.625rem' }],    // 16px – body copy
      lg:   ['1.125rem',  { lineHeight: '1.75rem' }],     // 18px – lead / large body
      xl:   ['1.25rem',   { lineHeight: '1.875rem' }],    // 20px – card titles
      '2xl':['1.5rem',    { lineHeight: '2rem' }],        // 24px – section subheads
      '3xl':['1.875rem',  { lineHeight: '2.375rem' }],    // 30px – page subheads
      '4xl':['2.25rem',   { lineHeight: '2.75rem' }],     // 36px – section headlines
      '5xl':['3rem',      { lineHeight: '1.15' }],        // 48px – hero subheadlines
      '6xl':['3.75rem',   { lineHeight: '1.1' }],         // 60px – hero headlines
      '7xl':['4.5rem',    { lineHeight: '1.05' }],        // 72px – display / jumbo
      '8xl':['6rem',      { lineHeight: '1' }],           // 96px – ultra large
      '9xl':['8rem',      { lineHeight: '1' }],           // 128px – maximum impact
    },

    extend: {
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              fontFamily: 'var(--font-inter), Inter, Roboto, Arial, sans-serif',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: { fontSize: '1.25rem', fontWeight: 600 },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
      }),
    },
  },
}

export default config
