import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContextStore'

// Custom Hook: components call this to read or change the shared theme.
export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeMode must be used inside ThemeContextProvider.')
  return context
}
