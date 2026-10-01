import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLanguage } from '../hooks/useLanguage'

const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 20px 0 10px;
`

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.2;
`

const ViewAll = styled(Link)`
  flex: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 700;
  &:hover { text-decoration: underline; }
`

export default function SectionHeading({
  title,
  to,
}: {
  title: string
  to?: string
}) {
  const { t } = useLanguage()
  return (
    <HeadingRow>
      <Title>{title}</Title>
      {to && <ViewAll to={to}>{t('viewAll')} <span aria-hidden="true">→</span></ViewAll>}
    </HeadingRow>
  )
}
