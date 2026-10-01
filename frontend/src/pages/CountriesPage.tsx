import styled from "styled-components";
import { CountryCard } from "../components/Cards";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import type { Country } from "../types";

const Page = styled.section`
  padding: 24px clamp(16px, 4vw, 40px) 36px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 620px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

export default function CountriesPage() {
  const { t } = useLanguage();
  const { data, isLoading, error } =
    useApiResource<Country[]>("/api/countries");

  return (
    <Page>
      <SectionHeading title={t("countries")} />
      {/* Ternary conditions show loading, error, or the successfully loaded cards. */}
      {isLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : error ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <Grid>
          {(data ?? []).map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </Grid>
      )}
    </Page>
  );
}
