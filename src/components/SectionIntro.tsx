type SectionIntroProps = {
  eyebrow: string
  title: string
  accent?: string
  copy?: string
  align?: 'left' | 'right'
  id?: string
}

export function SectionIntro({ eyebrow, title, accent, copy, align = 'left', id }: SectionIntroProps) {
  const titleParts = accent ? title.split(accent) : [title]
  return (
    <div className={`section-intro section-intro--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>
        {titleParts.map((part, index) => (
          <span key={`${part}-${index}`}>
            {part}
            {accent && index === 0 ? <em>{accent}</em> : null}
          </span>
        ))}
      </h2>
      <span className="section-wave" aria-hidden="true">≈≈≈</span>
      {copy ? <p className="section-intro__copy">{copy}</p> : null}
    </div>
  )
}
