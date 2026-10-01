import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import MapPanel from "../components/MapPanel";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import { localizedInfo } from "../utils/content";
import type { AttractionDetails, City, Country } from "../types";

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
  margin: 0 0 16px;
  font-size: clamp(28px, 4vw, 40px);
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
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.75;
`;

const Fact = styled.p`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.text};
  strong {
    display: block;
    margin-bottom: 3px;
  }
`;

const SiteLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  overflow-wrap: anywhere;
`;

export default function PlacePage() {
  // useParams gets the place ID from the matching React Router URL.
  const { id } = useParams();
  const { language, t } = useLanguage();
  const placeResource = useApiResource<AttractionDetails>(
    id ? `/api/attractions/${id}` : null,
  );
  const place = placeResource.data;
  const cityResource = useApiResource<City>(
    place ? `/api/cities/${place.cityId}` : null,
  );
  const city = cityResource.data;
  const countryResource = useApiResource<Country>(
    city ? `/api/countries/${city.countryId}` : null,
  );
  const info = place ? localizedInfo(place.infos, language) : undefined;
  const cityInfo = city ? localizedInfo(city.infos, language) : undefined;
  const countryInfo = countryResource.data
    ? localizedInfo(countryResource.data.infos, language)
    : undefined;

  return (
    <Page>
      <BackLink to="/places">← {t("backToPlaces")}</BackLink>
      {/* The ternary chooses which UI state the user should see. */}
      {placeResource.isLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : placeResource.error || !place ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <>
          <Title>{info?.name ?? place.slug}</Title>
          <Details>
            <img src={place.image} alt={info?.name ?? place.slug} />
            <div>
              <Description>{info?.description}</Description>
              {city && (
                <Fact>
                  <strong>{t("cities")}</strong>
                  <Link to={`/cities/${city.id}`}>
                    {cityInfo?.name ?? city.slug}
                    {countryInfo ? `, ${countryInfo.name}` : ""}
                  </Link>
                </Fact>
              )}
              <Fact>
                <strong>{t("address")}</strong>
                {place.address}
              </Fact>
              {place.website && (
                <Fact>
                  <strong>{t("website")}</strong>
                  <SiteLink
                    href={place.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {place.website} ↗
                  </SiteLink>
                </Fact>
              )}
            </div>
          </Details>
          {(place.latitude !== 0 || place.longitude !== 0) && (
            <>
              <SectionHeading title={t("findOnMap")} />
              <MapPanel latitude={place.latitude} longitude={place.longitude} />
            </>
          )}
        </>
      )}
    </Page>
  );
}
