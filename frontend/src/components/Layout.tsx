import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
`

const Main = styled.main`
  width: min(100%, 1200px);
  flex: 1;
  align-self: center;
`

export default function Layout() {
  return (
    <Site>
      <Header />
      {/* Outlet renders the child route inside the shared header/footer layout. */}
      <Main><Outlet /></Main>
      <Footer />
    </Site>
  )
}
