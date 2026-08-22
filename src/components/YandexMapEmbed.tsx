import { ArrowUpRight, MapPin } from '@phosphor-icons/react'

type YandexMapEmbedProps = {
  embedUrl?: string
  mapUrl: string
  mapLabel: string
}

export function YandexMapEmbed({ embedUrl, mapUrl, mapLabel }: YandexMapEmbedProps) {
  return (
    <div className="map-widget">
      {embedUrl ? (
        <div className="map-card map-card--live">
          <iframe
            className="map-card__iframe"
            src={embedUrl}
            title="Интерактивная карта UNITY — Самара, улица Гагарина, 118"
            aria-describedby="unity-map-description"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}
      <div className="map-widget__footer">
        <p id="unity-map-description">Интерактивная карта с точкой UNITY и маршрутом до улицы Гагарина, 118.</p>
        <a href={mapUrl} target="_blank" rel="noreferrer noopener" className="map-card__link">
          {mapLabel} <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <details className="map-fallback" open={!embedUrl}>
        <summary>Показать схему и ориентир</summary>
        <div className="map-card map-card--fallback">
          <div className="map-card__grid" aria-hidden="true">
            <span className="map-road map-road--one" />
            <span className="map-road map-road--two" />
            <span className="map-road map-road--three" />
            <span className="map-block map-block--one" />
            <span className="map-block map-block--two" />
            <span className="map-block map-block--three" />
          </div>
          <div className="map-card__pin">
            <MapPin aria-hidden="true" />
            <strong>UNITY</strong>
            <small>Гагарина, 118</small>
          </div>
        </div>
      </details>
    </div>
  )
}
