import { createContext } from 'react'
import type { ThemeMode } from './ThemeContext'

export type ThemeContextValue = {
  mode: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
