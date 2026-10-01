import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { PlaceCard } from "../components/Cards";
import MapPanel from "../components/MapPanel";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import { useAttractions } from "../hooks/useAttractions";
import { localizedInfo, flagEmoji } from "../utils/content";
import type { CityDetails, Country } from "../types";

const Page = styled.section`
  padding: 24px clamp(16px, 3vw, 32px) 36px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 14px;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.15;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 22px;
  align-items: start;
  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
    border-radius: 13px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    img {
      height: 240px;
    }
  }
`;

const Description = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.75;
`;

const CountryLink = styled(Link)`
  display: inline-block;
  padding: 7px 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 700;
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

export default function CityPage() {
  // The router puts the URL's :id value in this parameter.
  const { id } = useParams();
  const { language, t } = useLanguage();
  const cityResource = useApiResource<CityDetails>(
    id ? `/api/cities/${id}` : null,
  );
  const countriesResource = useApiResource<Country[]>("/api/countries");
  const {
    attractions,
    isLoading: placesLoading,
    error: placesError,
  } = useAttractions();
  const city = cityResource.data;
  const info = city ? localizedInfo(city.infos, language) : undefined;
  const country = countriesResource.data?.find(
    (item) => item.id === city?.countryId,
  );
  const countryInfo = country
    ? localizedInfo(country.infos, language)
    : undefined;
  // filter iterates through places and keeps only those belonging to the selected city.
  const cityPlaces = attractions.filter((place) => place.cityId === city?.id);
  const mapPlace = cityPlaces.find(
    (place) => place.latitude !== 0 || place.longitude !== 0,
  );
  const isLoading =
    cityResource.isLoading || countriesResource.isLoading || placesLoading;

  return (
    <Page>
      <BackLink to="/cities">← {t("backToCities")}</BackLink>
      {/* `||` means any failed request is enough to show the error state. */}
      {isLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : cityResource.error ||
        countriesResource.error ||
        placesError ||
        !city ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <>
          <Title>
            <span aria-hidden="true">{flagEmoji(city.country.code)}</span>
            {info?.name ?? city.slug}
          </Title>
          <Details>
            <img src={city.image} alt={info?.name ?? city.slug} />
            <div>
              <Description>{info?.description}</Description>
              {country && (
                <CountryLink to={`/countries/${country.id}`}>
                  {countryInfo?.name ?? country.code}
                </CountryLink>
              )}
            </div>
          </Details>
          {mapPlace && (
            <>
              <SectionHeading title={t("findOnMap")} />
              <MapPanel
                latitude={mapPlace.latitude}
                longitude={mapPlace.longitude}
              />
            </>
          )}
          <SectionHeading
            title={`${t("popularPlacesIn")} ${info?.name ?? city.slug}`}
          />
          {cityPlaces.length === 0 ? (
            <StatusMessage>{t("noResults")}</StatusMessage>
          ) : (
            <Grid>
              {cityPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  attraction={place}
                  cityName={info?.name ?? city.slug}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </Page>
  );
}
