import { useEffect, useRef, useState } from 'react'
import './ContentSection.css'

function ContentSection({ id, eyebrow, title, children, variant = 'default' }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`content-section bento-card reveal-card ${variant} ${isVisible ? 'is-visible' : ''}`}
      id={id}
      ref={sectionRef}
    >
      <div className="content-section-heading">
        {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      <div className="content-section-body">{children}</div>
    </section>
  )
}

export default ContentSection
