import styled from "styled-components";
import { PlaceCard } from "../components/Cards";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import { useAttractions } from "../hooks/useAttractions";
import type { City } from "../types";

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

export default function PlacesPage() {
  const { t, language } = useLanguage();
  const { attractions, isLoading, error } = useAttractions();
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useApiResource<City[]>("/api/cities");

  return (
    <Page>
      <SectionHeading title={t("places")} />
      {/* Loading/error checks come before rendering the list, so users see the right request state. */}
      {isLoading || citiesLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : error || citiesError ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <Grid>
          {attractions.map((place) => {
            const city = cities?.find((item) => item.id === place.cityId);
            const cityName =
              city?.infos.find((info) => info.language?.code === language)
                ?.name ?? place.city.slug;
            return (
              <PlaceCard
                key={place.id}
                attraction={place}
                cityName={cityName}
              />
            );
          })}
        </Grid>
      )}
    </Page>
  );
}
