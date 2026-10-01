import type { ReactNode } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import type { LanguageCode } from '../types'
import { LanguageContext } from './LanguageContextStore'

const messages = {
  // Each key has a translation in both languages; t(key) selects the active one.
  en: {
    home: 'Home',
    countries: 'Countries',
    cities: 'Cities',
    places: 'Places',
    about: 'About',
    exploreTitle: 'Explore the World with TravelMate',
    exploreText: 'Discover amazing places, cities and countries.',
    exploreSubtext: 'Your next adventure is just a click away.',
    searchPlaceholder: 'Search for countries, cities or places...',
    search: 'Search',
    popularCountries: 'Popular Countries',
    popularCities: 'Popular Cities',
    featuredPlaces: 'Featured Places',
    viewAll: 'View all',
    findOnMap: 'Find on the map',
    popularPlacesIn: 'Popular places in',
    address: 'Address',
    website: 'Website',
    backToCities: 'Back to cities',
    backToPlaces: 'Back to places',
    noResults: 'No results found. Try another search.',
    loading: 'Loading travel inspiration...',
    error: 'We could not load the travel data. Check that the API is running.',
    aboutTitle: 'About TravelMate',
    aboutText: 'TravelMate helps you discover destinations, cities and memorable places across Europe.',
    footerText: 'Explore. Discover. Belong.',
    light: 'Light',
    dark: 'Dark',
    resultFor: 'Search results for',
    countryCities: 'Cities in',
    noCities: 'No cities are listed for this country yet.',
  },
  da: {
    home: 'Forside',
    countries: 'Lande',
    cities: 'Byer',
    places: 'Steder',
    about: 'Om os',
    exploreTitle: 'Oplev verden med TravelMate',
    exploreText: 'Find fantastiske steder, byer og lande.',
    exploreSubtext: 'Dit næste eventyr er kun et klik væk.',
    searchPlaceholder: 'Søg efter lande, byer eller steder...',
    search: 'Søg',
    popularCountries: 'Populære lande',
    popularCities: 'Populære byer',
    featuredPlaces: 'Udvalgte steder',
    viewAll: 'Se alle',
    findOnMap: 'Find på kortet',
    popularPlacesIn: 'Populære steder i',
    address: 'Adresse',
    website: 'Hjemmeside',
    backToCities: 'Tilbage til byer',
    backToPlaces: 'Tilbage til steder',
    noResults: 'Ingen resultater. Prøv en anden søgning.',
    loading: 'Henter rejseinspiration...',
    error: 'Rejsedata kunne ikke hentes. Kontrollér, at API-serveren kører.',
    aboutTitle: 'Om TravelMate',
    aboutText: 'TravelMate hjælper dig med at opdage destinationer, byer og mindeværdige steder i Europa.',
    footerText: 'Udforsk. Oplev. Hør til.',
    light: 'Lys',
    dark: 'Mørk',
    resultFor: 'Søgeresultater for',
    countryCities: 'Byer i',
    noCities: 'Der er endnu ingen byer for dette land.',
  },
} as const

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  // Props are values passed into a component. Props.children is the nested JSX between Provider tags.
  const [language, setLanguage] = useLocalStorageState<LanguageCode>(
    'travelmate-language',
    'en',
    ['en', 'da'],
  )

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        // This function uses the selected language to find the matching UI label.
        t: (key) => messages[language][key],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
