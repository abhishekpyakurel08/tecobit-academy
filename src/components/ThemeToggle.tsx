'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import type { Theme } from '@/providers/Theme/types'

// ── Option definitions ──────────────────────────────────────────────────────
const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: 'light',  label: 'Light',  Icon: Sun },
  { value: 'dark',   label: 'Dark',   Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
]

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted,  setMounted]  = useState(false)
  const [isOpen,   setIsOpen]   = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  if (!mounted) {
    return <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger button ────────────────────────────────────────────── */}
      <Button
        variant="ghost"
        size="sm"
        aria-label="Toggle colour theme"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        className={[
          'h-11 w-11 p-0 rounded-xl',
          'bg-white/5 hover:bg-white/15',
          'border border-white/10',
          'text-white',
          'transition-all duration-300',
          className,
        ].join(' ')}
      >
        <div className="relative h-5 w-5 flex items-center justify-center">
          <Sun
            className={[
              'absolute h-5 w-5 transition-all duration-500',
              resolvedTheme === 'dark'
                ? 'opacity-0 scale-50 rotate-90'
                : 'opacity-100 scale-100 rotate-0',
            ].join(' ')}
          />
          <Moon
            className={[
              'absolute h-5 w-5 transition-all duration-500',
              resolvedTheme === 'dark'
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-50 -rotate-90',
            ].join(' ')}
          />
        </div>
      </Button>

      {/* ── Dropdown ─────────────────────────────────────────────────── */}
      <div
        role="listbox"
        aria-label="Theme options"
        className={[
          'absolute right-0 mt-3 w-44 p-2',
          'rounded-2xl shadow-2xl',
          'bg-[#0c0c0f]/95 backdrop-blur-2xl',
          'border border-white/10',
          'z-[10000]',
          'transition-all duration-200 origin-top-right',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        {OPTIONS.map(({ value, label, Icon }) => {
          const isSelected = theme === value
          return (
            <button
              key={value}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                setTheme(value)
                setIsOpen(false)
              }}
              className={[
                'w-full flex items-center gap-3',
                'px-4 py-2.5 rounded-xl',
                'text-sm font-black uppercase tracking-widest',
                'transition-all duration-200',
                isSelected
                  ? 'bg-[#5173ff] text-white shadow-lg shadow-[#5173ff]/30'
                  : 'text-white/50 hover:bg-white/8 hover:text-white',
              ].join(' ')}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
              {isSelected && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white opacity-70" />
              )}
            </button>
          )
        })}

        {/* ── Resolved hint ──────────────────────────────────────────── */}
        {theme === 'system' && (
          <div className="mt-2 pt-2 border-t border-white/5 px-4 pb-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25">
              Currently: {resolvedTheme}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
