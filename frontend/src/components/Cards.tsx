import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLanguage } from '../hooks/useLanguage'
import { localizedInfo, flagEmoji } from '../utils/content'
import type { AttractionDetails, City, Country } from '../types'

// styled-components creates React components whose template literal contains their CSS.
const CardLink = styled(Link)`
  /* styled-components lets us write CSS in a tagged template literal and use theme values. */
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(18, 51, 91, 0.16);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 132px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.soft};

  @media (max-width: 640px) {
    height: 168px;
  }
`

const CardContent = styled.div`
  display: grid;
  gap: 3px;
  padding: 11px 12px 13px;
`

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  line-height: 1.35;
`

const CardSubtext = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  line-height: 1.4;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const CountryName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Flag = styled.span`
  font-size: 18px;
  line-height: 1;
`

const PlaceMeta = styled(CardSubtext)`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
`

// Props carry data into a component; destructuring `{country}` reads that value from the props object.
export function CountryCard({ country }: { country: Country }) {
  const { language } = useLanguage()
  const info = localizedInfo(country.infos, language)

  return (
    <CardLink to={`/countries/${country.id}`}>
      <CardImage src={country.image} alt={info?.name ?? country.code} loading="lazy" />
      <CardContent>
        <CountryName>
          <Flag aria-hidden="true">{flagEmoji(country.code)}</Flag>
          <CardTitle>{info?.name ?? country.code}</CardTitle>
        </CountryName>
        <CardSubtext>{info?.description}</CardSubtext>
      </CardContent>
    </CardLink>
  )
}

export function CityCard({
  city,
  countryCode,
  countryName,
}: {
  city: City
  countryCode: string
  countryName: string
}) {
  const { language } = useLanguage()
  const info = localizedInfo(city.infos, language)

  return (
    <CardLink to={`/cities/${city.id}`}>
      <CardImage src={city.image} alt={info?.name ?? city.slug} loading="lazy" />
      <CardContent>
        <CardTitle>{info?.name ?? city.slug}</CardTitle>
        <CardSubtext>{`${flagEmoji(countryCode)} ${countryName}`}</CardSubtext>
      </CardContent>
    </CardLink>
  )
}

export function PlaceCard({
  attraction,
  cityName,
}: {
  attraction: AttractionDetails
  cityName: string
}) {
  const { language } = useLanguage()
  const info = localizedInfo(attraction.infos, language)

  return (
    <CardLink to={`/places/${attraction.id}`}>
      <CardImage src={attraction.image} alt={info?.name ?? attraction.slug} loading="lazy" />
      <CardContent>
        <CardTitle>{info?.name ?? attraction.slug}</CardTitle>
        <PlaceMeta>
          <span aria-hidden="true">⌖</span>
          {cityName}
        </PlaceMeta>
      </CardContent>
    </CardLink>
  )
}
