'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useEffect, useState } from 'react'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import type { Theme } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<Theme | 'system'>('system')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(themeLocalStorageKey) as Theme | null
      setValue(stored ?? 'system')
    } catch (_) {}
  }, [])

  const onThemeChange = (themeToSet: Theme | 'system') => {
    setTheme(themeToSet === 'system' ? 'system' : themeToSet)
    setValue(themeToSet)
  }

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}
