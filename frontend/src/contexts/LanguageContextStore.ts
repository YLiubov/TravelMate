import { createContext } from 'react'
import type { LanguageCode } from '../types'

export type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: (key: MessageKey) => string
}

export type MessageKey =
  | 'home'
  | 'countries'
  | 'cities'
  | 'places'
  | 'about'
  | 'exploreTitle'
  | 'exploreText'
  | 'exploreSubtext'
  | 'searchPlaceholder'
  | 'search'
  | 'popularCountries'
  | 'popularCities'
  | 'featuredPlaces'
  | 'viewAll'
  | 'findOnMap'
  | 'popularPlacesIn'
  | 'address'
  | 'website'
  | 'backToCities'
  | 'backToPlaces'
  | 'noResults'
  | 'loading'
  | 'error'
  | 'aboutTitle'
  | 'aboutText'
  | 'footerText'
  | 'light'
  | 'dark'
  | 'resultFor'
  | 'countryCities'
  | 'noCities'

export const LanguageContext = createContext<LanguageContextValue | null>(null)
