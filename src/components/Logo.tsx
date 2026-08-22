type LogoProps = {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <a className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} href="#top" aria-label="UNITY, на главную">
      <span className="brand-mark__word">UNITY</span>
      <span className="brand-mark__descriptor">тайм-кафе</span>
    </a>
  )
}
