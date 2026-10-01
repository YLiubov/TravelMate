import type { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeContext } from './ThemeContextStore'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

export type ThemeMode = 'light' | 'dark'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      page: string
      surface: string
      text: string
      muted: string
      primary: string
      primaryHover: string
      border: string
      soft: string
      shadow: string
    }
  }
}

const themes = {
  // The same styled-components read this shared theme, so switching mode updates the whole UI.
  light: {
    colors: {
      page: '#f4f8fd',
      surface: '#ffffff',
      text: '#10294b',
      muted: '#647995',
      primary: '#0866e8',
      primaryHover: '#004fbd',
      border: '#e2eaf4',
      soft: '#edf4ff',
      shadow: '0 8px 24px rgba(18, 51, 91, 0.09)',
    },
  },
  dark: {
    colors: {
      page: '#09182c',
      surface: '#10233e',
      text: '#edf4ff',
      muted: '#a7bad3',
      primary: '#6eabff',
      primaryHover: '#9bc4ff',
      border: '#29415f',
      soft: '#1b3554',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
    },
  },
} satisfies Record<ThemeMode, import('styled-components').DefaultTheme>

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  // Context lets nested components read/change the theme without passing props through every level.
  const [mode, setMode] = useLocalStorageState<ThemeMode>('travelmate-theme', 'light', [
    'light',
    'dark',
  ])
  const theme = themes[mode]

  return (
    <ThemeContext.Provider
      value={{
        mode,
        // Ternary operator chooses the other theme: light becomes dark and dark becomes light.
        toggleTheme: () => setMode(mode === 'light' ? 'dark' : 'light'),
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
