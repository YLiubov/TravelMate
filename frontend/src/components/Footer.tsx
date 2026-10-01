import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import styled from 'styled-components'
import { useLanguage } from '../hooks/useLanguage'

const FooterBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 11px;

  @media (max-width: 650px) {
    flex-wrap: wrap;
    justify-content: center;
    padding: 18px 16px;
  }
`

const Brand = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
  letter-spacing: -0.5px;
  span { color: ${({ theme }) => theme.colors.primary}; }
`

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  a:hover { color: ${({ theme }) => theme.colors.primary}; }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`

export default function Footer() {
  const { t } = useLanguage()
  return (
    <FooterBar>
      <Brand>Travel<span>Mate</span></Brand>
      <span>{t('footerText')}</span>
      <FooterLinks>
        <a href="/about">{t('about')}</a>
        <a href="mailto:hello@travelmate.example">Contact</a>
        <a href="#privacy">Privacy</a>
      </FooterLinks>
      <SocialLinks aria-label="Social media">
        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://youtube.com" aria-label="YouTube"><FaYoutube /></a>
      </SocialLinks>
    </FooterBar>
  )
}
