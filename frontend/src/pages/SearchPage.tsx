import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { CityCard, CountryCard, PlaceCard } from "../components/Cards";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import { useAttractions } from "../hooks/useAttractions";
import { localizedInfo } from "../utils/content";
import type { City, Country } from "../types";

const Page = styled.section`
  padding: 24px clamp(16px, 4vw, 40px) 36px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
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

export default function SearchPage() {
  // Query parameters (параметры запроса) come after ? in the URL, e.g. ?q=France.
  const [params] = useSearchParams();
  // `q` is a query parameter, e.g. /search?q=France (not a route parameter).
  const query = params.get("q")?.trim() ?? "";
  const search = query.toLocaleLowerCase();
  const { language, t } = useLanguage();
  const countries = useApiResource<Country[]>("/api/countries");
  const cities = useApiResource<City[]>("/api/cities");
  const places = useAttractions();
  const isLoading = countries.isLoading || cities.isLoading || places.isLoading;
  const hasError = countries.error || cities.error || places.error;

  // filter loops through each collection; `?? []` supplies an empty array before data arrives.
  const matchingCountries = (countries.data ?? []).filter((country) => {
    const info = localizedInfo(country.infos, language);
    return `${info?.name ?? ""} ${info?.description ?? ""}`
      .toLocaleLowerCase()
      .includes(search);
  });
  const matchingCities = (cities.data ?? []).filter((city) => {
    const info = localizedInfo(city.infos, language);
    return `${info?.name ?? ""} ${info?.description ?? ""}`
      .toLocaleLowerCase()
      .includes(search);
  });
  const matchingPlaces = places.attractions.filter((place) => {
    const info = localizedInfo(place.infos, language);
    return `${info?.name ?? ""} ${info?.description ?? ""}`
      .toLocaleLowerCase()
      .includes(search);
  });

  return (
    <Page>
      <SectionHeading title={`${t("resultFor")} “${query}”`} />
      {isLoading ? (
        <StatusMessage>{t("loading")}</StatusMessage>
      ) : hasError ? (
        <StatusMessage>{t("error")}</StatusMessage>
      ) : (
        <>
          {/* `&&` renders this section only when there are matching results. */}
          {matchingCountries.length > 0 && (
            <>
              <SectionHeading title={t("countries")} />
              <Grid>
                {matchingCountries.map((item) => (
                  <CountryCard key={item.id} country={item} />
                ))}
              </Grid>
            </>
          )}
          {matchingCities.length > 0 && (
            <>
              <SectionHeading title={t("cities")} />
              <Grid>
                {matchingCities.map((city) => {
                  const country = countries.data?.find(
                    (item) => item.id === city.countryId,
                  );
                  const countryName =
                    localizedInfo(country?.infos ?? [], language)?.name ??
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
            </>
          )}
          {matchingPlaces.length > 0 && (
            <>
              <SectionHeading title={t("places")} />
              <Grid>
                {matchingPlaces.map((place) => {
                  const city = cities.data?.find(
                    (item) => item.id === place.cityId,
                  );
                  const cityName =
                    localizedInfo(city?.infos ?? [], language)?.name ??
                    place.city.slug;
                  return (
                    <PlaceCard
                      key={place.id}
                      attraction={place}
                      cityName={cityName}
                    />
                  );
                })}
              </Grid>
            </>
          )}
          {matchingCountries.length +
            matchingCities.length +
            matchingPlaces.length ===
            0 && <StatusMessage>{t("noResults")}</StatusMessage>}
        </>
      )}
    </Page>
  );
}
