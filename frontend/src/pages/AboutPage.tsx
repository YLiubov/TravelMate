import styled from "styled-components";
import { useLanguage } from "../hooks/useLanguage";

const Page = styled.section`
  max-width: 820px;
  min-height: 56vh;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Title = styled.h1`
  margin: 0 0 14px;
  font-size: clamp(28px, 4vw, 42px);
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 17px;
  line-height: 1.8;
`;

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <Page>
      <Title>{t("aboutTitle")}</Title>
      <Description>{t("aboutText")}</Description>
    </Page>
  );
}
