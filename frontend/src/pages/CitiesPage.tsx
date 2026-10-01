import styled from "styled-components";
import { CityCard } from "../components/Cards";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import type { City, Country } from "../types";

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

export default function CitiesPage() {
  const { language, t } = useLanguage();
  const cities = useApiResource<City[]>("/api/cities");
  const countries = useApiResource<Country[]>("/api/countries");
  const isLoading = cities.isLoading || countries.isLoading;

  return (
    <Page>
      <SectionHeading title={t("cities")} />
      {isLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : cities.error || countries.error ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <Grid>
          {(cities.data ?? []).map((city) => {
            const country = countries.data?.find(
              (item) => item.id === city.countryId,
            );
            const countryName =
              country?.infos.find((info) => info.language?.code === language)
                ?.name ??
              country?.code ??
              "";
            return (
              <CityCard
                key={city.id}
                city={city}
                countryCode={country?.code ?? ""}
                countryName={countryName}
              />
            );
          })}
        </Grid>
      )}
    </Page>
  );
}
