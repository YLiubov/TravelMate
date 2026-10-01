import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CityCard } from '../components/Cards'
import SectionHeading from '../components/SectionHeading'
import StatusMessage from '../components/StatusMessage'
import { useLanguage } from '../hooks/useLanguage'
import { useApiResource } from '../hooks/useApiResource'
import { localizedInfo, flagEmoji } from '../utils/content'
import type { City, Country } from '../types'

type CountryDetails = Country & {
  cities: Array<Pick<City, 'id' | 'countryId' | 'slug' | 'image'>>
}

const Page = styled.section`
  padding: 24px clamp(16px, 4vw, 40px) 36px;
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
`

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) 1fr;
  gap: 22px;
  align-items: center;
  margin-bottom: 20px;
  img { width: 100%; height: 260px; object-fit: cover; border-radius: 13px; }
  @media (max-width: 650px) { grid-template-columns: 1fr; img { height: 220px; } }
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
  font-size: clamp(26px, 4vw, 38px);
  line-height: 1.15;
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  @media (max-width: 900px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 620px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 380px) { grid-template-columns: 1fr; }
`

export default function CountryPage() {
  // useParams reads the dynamic :id segment from /countries/:id.
  const { id } = useParams()
  const { language, t } = useLanguage()
  const countryResource = useApiResource<CountryDetails>(id ? `/api/countries/${id}` : null)
  const citiesResource = useApiResource<City[]>('/api/cities')
  const country = countryResource.data
  // `?.` avoids reading cities before the country response arrives.
  const info = country ? localizedInfo(country.infos, language) : undefined
  const countryCityIds = new Set(country?.cities.map((city) => city.id) ?? [])
  const cities = (citiesResource.data ?? []).filter((city) => countryCityIds.has(city.id))
  const isLoading = countryResource.isLoading || citiesResource.isLoading

  return (
    <Page>
      <BackLink to="/countries">← {t('countries')}</BackLink>
      {/* This conditional expression selects loading, error, or detail content. */}
      {isLoading ? <StatusMessage>{t('loading')}</StatusMessage> : countryResource.error || citiesResource.error || !country ? <StatusMessage>{t('error')}</StatusMessage> : (
        <>
          <Intro>
            <img src={country.image} alt={info?.name ?? country.code} />
            <div>
              <Title><span aria-hidden="true">{flagEmoji(country.code)}</span>{info?.name ?? country.code}</Title>
              <Description>{info?.description}</Description>
            </div>
          </Intro>
          <SectionHeading title={`${t('countryCities')} ${info?.name ?? ''}`} />
          {cities.length === 0 ? <StatusMessage>{t('noCities')}</StatusMessage> : (
            <Grid>{cities.map((city) => <CityCard key={city.id} city={city} countryCode={country.code} countryName={info?.name ?? country.code} />)}</Grid>
          )}
        </>
      )}
    </Page>
  )
}
