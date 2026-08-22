import { ArrowUpRight, MapPin } from '@phosphor-icons/react'

type YandexMapEmbedProps = {
  embedUrl?: string
  mapUrl: string
  mapLabel: string
}

const mapTitle = 'Интерактивная карта UNITY — Самара, улица Гагарина, 118'

export function YandexMapEmbed({ embedUrl, mapUrl, mapLabel }: YandexMapEmbedProps) {
  const routeCta = (
    <a
      className="button button--primary map-widget__cta"
      href={mapUrl}
      target="_blank"
      rel="noreferrer noopener"
      title={mapLabel}
    >
      <span>Открыть маршрут в Яндекс Картах</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  )

  return (
    <div className={`map-widget ${embedUrl ? 'map-widget--live' : 'map-widget--fallback-only'}`}>
      {embedUrl ? (
        <>
          <div className="map-card map-card--live">
            <iframe
              className="map-card__iframe"
              src={embedUrl}
              title={mapTitle}
              aria-describedby="unity-map-description"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="map-widget__footer map-widget__footer--live">
            <div className="map-widget__address">
              <MapPin aria-hidden="true" />
              <span>
                <small>адрес UNITY</small>
                <strong id="unity-map-description">Самара, ул. Гагарина, 118</strong>
              </span>
            </div>
            {routeCta}
          </div>
        </>
      ) : (
        <div className="map-fallback" role="group" aria-label="Ориентир для входа в UNITY">
          <div className="map-fallback__heading">
            <p className="map-fallback__label">как нас найти</p>
            <p className="map-fallback__title">Ориентир для входа</p>
            <p className="map-fallback__address"><MapPin aria-hidden="true" />Самара, ул. Гагарина, 118</p>
          </div>
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
          {routeCta}
        </div>
      )}
    </div>
  )
}
