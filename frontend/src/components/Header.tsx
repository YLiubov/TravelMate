import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FaGlobe, FaMoon, FaSun } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage'
import { useThemeMode } from '../hooks/useThemeMode'

const HeaderBar = styled.header`
  /* styled-components attaches this CSS to a React component. */
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 66px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 760px) {
    flex-wrap: wrap;
    padding: 10px 16px;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 9px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.7px;
  span { color: ${({ theme }) => theme.colors.primary}; }
`

const Plane = styled.span`
  font-size: 22px;
  transform: rotate(-8deg);
`

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;

  @media (max-width: 760px) {
    /* The ternary chooses whether the mobile menu is shown or hidden. */
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    order: 3;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    padding-top: 6px;
  }
`

const NavItem = styled(NavLink)`
  padding: 8px 12px;
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
  &.active { background: ${({ theme }) => theme.colors.soft}; color: ${({ theme }) => theme.colors.primary}; }
  &:hover { background: ${({ theme }) => theme.colors.soft}; }
`

const Controls = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
`

const SelectWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  select { border: 0; outline: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; }
  option { color: #10294b; }
`

const ThemeButtons = styled.div`
  display: flex;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.soft};
`

const ThemeButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border: 0;
  border-radius: 999px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.text)};
  font-size: 11px;
  cursor: pointer;
`

const MenuButton = styled.button`
  display: none;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  cursor: pointer;
  @media (max-width: 760px) { display: inline-flex; }
`

export default function Header() {
  // Destructuring gets several values from each custom Hook's returned object.
  const { language, setLanguage, t } = useLanguage()
  const { mode, toggleTheme } = useThemeMode()
  // useState stores this component's menu state; clicking the button changes it.
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderBar>
      <Brand to="/" aria-label="TravelMate home">
        <Plane aria-hidden="true">✈</Plane>
        <span>Travel</span>Mate
      </Brand>
      <Nav $open={isMenuOpen} aria-label="Main navigation">
        <NavItem to="/" end onClick={() => setIsMenuOpen(false)}>{t('home')}</NavItem>
        <NavItem to="/countries" onClick={() => setIsMenuOpen(false)}>{t('countries')}</NavItem>
        <NavItem to="/cities" onClick={() => setIsMenuOpen(false)}>{t('cities')}</NavItem>
        <NavItem to="/places" onClick={() => setIsMenuOpen(false)}>{t('places')}</NavItem>
        <NavItem to="/about" onClick={() => setIsMenuOpen(false)}>{t('about')}</NavItem>
      </Nav>
      <Controls>
        <SelectWrap>
          <FaGlobe aria-hidden="true" />
          <select
            aria-label="Choose language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'da')}
          >
            <option value="en">EN</option>
            <option value="da">DA</option>
          </select>
        </SelectWrap>
        <ThemeButtons aria-label="Choose color theme">
          <ThemeButton
            type="button"
            aria-pressed={mode === 'light'}
            $active={mode === 'light'}
            onClick={mode === 'light' ? undefined : toggleTheme}
          >
            <FaSun aria-hidden="true" />{t('light')}
          </ThemeButton>
          <ThemeButton
            type="button"
            aria-pressed={mode === 'dark'}
            $active={mode === 'dark'}
            onClick={mode === 'dark' ? undefined : toggleTheme}
          >
            <FaMoon aria-hidden="true" />{t('dark')}
          </ThemeButton>
        </ThemeButtons>
        <MenuButton
          type="button"
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? '×' : '☰'}
        </MenuButton>
      </Controls>
    </HeaderBar>
  )
}
