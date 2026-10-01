import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { CountryCard, CityCard, PlaceCard } from "../components/Cards";
import SectionHeading from "../components/SectionHeading";
import StatusMessage from "../components/StatusMessage";
import { useLanguage } from "../hooks/useLanguage";
import { useApiResource } from "../hooks/useApiResource";
import { useAttractions } from "../hooks/useAttractions";
import type { City, Country } from "../types";

const Hero = styled.section`
  position: relative;
  display: flex;
  min-height: 210px;
  align-items: center;
  overflow: hidden;
  padding: 24px clamp(18px, 5vw, 56px);
  background: #8fc2e8 url("/assets/hero-frontend/travelmate-hero.png") center
    52% / cover no-repeat;
  isolation: isolate;

  &::before {
    position: absolute;
    z-index: -1;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(244, 249, 255, 0.94),
      rgba(244, 249, 255, 0.77) 43%,
      rgba(244, 249, 255, 0.03)
    );
    content: "";
  }
`;

const HeroContent = styled.div`
  width: min(100%, 600px);
  color: #10294b;
`;

const HeroTitle = styled.h1`
  max-width: 520px;
  margin: 0 0 6px;
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -1.3px;
  line-height: 1.05;
`;

const HeroText = styled.p`
  margin: 3px 0;
  font-size: 14px;
`;

const SearchForm = styled.form`
  display: flex;
  width: min(100%, 530px);
  gap: 8px;
  margin-top: 12px;
  padding: 5px;
  border: 1px solid #d7e3f2;
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 18px rgba(16, 41, 75, 0.13);
`;

const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 0;
  outline: 0;
  color: #10294b;
  font-size: 13px;
`;

const SearchButton = styled.button`
  flex: none;
  padding: 8px 20px;
  border: 0;
  border-radius: 7px;
  background: #0866e8;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #004fbd;
  }
`;

const Content = styled.div`
  padding: 2px clamp(16px, 4vw, 40px) 30px;
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns = 5 }) => $columns},
    minmax(0, 1fr)
  );
  gap: 12px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

export default function HomePage() {
  // `const` names values that this render reads; `let` is for a value reassigned later.
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  // These strings are API endpoints (the server paths); this hook fetches each resource.
  const countries = useApiResource<Country[]>("/api/countries");
  const cities = useApiResource<City[]>("/api/cities");
  const {
    attractions,
    isLoading: placesLoading,
    error: placesError,
  } = useAttractions();

  // The query goes into the URL so SearchPage can read it after navigation.
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>{t("exploreTitle")}</HeroTitle>
          <HeroText>{t("exploreText")}</HeroText>
          <HeroText>{t("exploreSubtext")}</HeroText>
          <SearchForm onSubmit={handleSearch} role="search">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
            />
            <SearchButton type="submit">{t("search")}</SearchButton>
          </SearchForm>
        </HeroContent>
      </Hero>
      <Content>
        <SectionHeading title={t("popularCountries")} to="/countries" />
        {/* Ternary conditions choose between the loading, error, and success states. */}
        {countries.error ? (
          <StatusMessage>{t("error")}</StatusMessage>
        ) : countries.isLoading ? (
          <StatusMessage>{t("loading")}</StatusMessage>
        ) : (
          <Grid>
            {(countries.data ?? []).slice(0, 5).map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </Grid>
        )}

        <SectionHeading title={t("popularCities")} to="/cities" />
        {cities.error ? (
          <StatusMessage>{t("error")}</StatusMessage>
        ) : cities.isLoading ? (
          <StatusMessage>{t("loading")}</StatusMessage>
        ) : (
          <Grid>
            {(cities.data ?? []).slice(0, 5).map((city) => {
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

        <SectionHeading title={t("featuredPlaces")} to="/places" />
        {placesError ? (
          <StatusMessage>{t("error")}</StatusMessage>
        ) : placesLoading ? (
          <StatusMessage>{t("loading")}</StatusMessage>
        ) : (
          <Grid>
            {attractions.slice(0, 5).map((place) => {
              const city = cities.data?.find(
                (item) => item.id === place.cityId,
              );
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
      </Content>
    </>
  );
}
