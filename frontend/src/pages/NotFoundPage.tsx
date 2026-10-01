import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.section`
  min-height: 56vh;
  padding: 70px 24px;
  text-align: center;
  h1 { margin: 0 0 12px; }
  a { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; }
`

export default function NotFoundPage() {
  return <Page><h1>Page not found</h1><Link to="/">Return to TravelMate</Link></Page>
}
