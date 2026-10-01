import styled from 'styled-components'
import { useLanguage } from '../hooks/useLanguage'
import { mapEmbedUrl } from '../utils/content'

const Wrapper = styled.section`
  margin: 20px 0;
`

const MapFrame = styled.iframe`
  display: block;
  width: 100%;
  height: clamp(240px, 42vw, 380px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
`

const MapLink = styled.a`
  display: inline-block;
  margin-top: 7px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  &:hover { text-decoration: underline; }
`

export default function MapPanel({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) {
  const { t } = useLanguage()
  const mapUrl = mapEmbedUrl(latitude, longitude)

  return (
    <Wrapper>
      <MapFrame title={t('findOnMap')} src={mapUrl} loading="lazy" />
      <MapLink
        href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=14/${latitude}/${longitude}`}
        target="_blank"
        rel="noreferrer"
      >
        {t('findOnMap')} ↗
      </MapLink>
    </Wrapper>
  )
}
