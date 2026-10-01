import styled from 'styled-components'

const Message = styled.p`
  margin: 18px 0;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
`

export default function StatusMessage({ children }: { children: string }) {
  return <Message role="status">{children}</Message>
}
