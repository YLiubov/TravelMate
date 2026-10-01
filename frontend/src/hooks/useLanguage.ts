import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContextStore'

// Custom Hook: components call this to read the shared language and translation function.
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageContextProvider.')
  return context
}
