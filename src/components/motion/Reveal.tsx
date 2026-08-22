import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

type RevealOptions = { delay?: number }

/**
 * IntersectionObserver-backed reveal state for both wrapper elements and
 * existing semantic section roots. The observer disconnects after the first
 * reveal so long pages do not keep a listener for every block forever.
 */
export function useReveal({ delay = 0 }: RevealOptions = {}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px 4% 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    className: `reveal${visible ? ' reveal--visible' : ''}`,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  }
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reveal = useReveal({ delay })
  return <div ref={reveal.ref as Ref<HTMLDivElement>} className={`${reveal.className} ${className}`.trim()} style={reveal.style}>{children}</div>
}
