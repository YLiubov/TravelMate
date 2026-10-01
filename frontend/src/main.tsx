import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LanguageContextProvider } from './contexts/LanguageContext'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { GlobalStyle } from './styles/GlobalStyle'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Providers make shared theme/language values available to all child components. */}
    <ThemeContextProvider>
      <LanguageContextProvider>
        <GlobalStyle />
        <App />
      </LanguageContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
