import { useEffect, useMemo, useRef, useState } from 'react'
import './TableOfContents.css'

function TableOfContents({ title = "What's Inside", sections = [] }) {
  const validSections = useMemo(
    () => sections.filter((section) => section?.id && section?.label),
    [sections],
  )
  const [activeId, setActiveId] = useState(validSections[0]?.id || '')
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const linkRefs = useRef(new Map())

  useEffect(() => {
    if (!validSections.length) return undefined

    const elements = validSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)

    if (!elements.length) return undefined

    let rafId = 0

    const updateActiveSection = () => {
      rafId = 0

      const anchorLine = Math.max(96, Math.min(window.innerHeight * 0.18, 168))
      const lowerViewportLimit = window.innerHeight * 0.72
      const documentHeight = document.documentElement.scrollHeight
      const nearDocumentBottom =
        window.scrollY + window.innerHeight >= documentHeight - Math.max(180, window.innerHeight * 0.45)

      let nextActiveId = ''
      let closestDistance = Number.POSITIVE_INFINITY

      for (const element of elements) {
        const rect = element.getBoundingClientRect()

        if (rect.top > lowerViewportLimit) {
          break
        }

        if (rect.bottom < anchorLine) {
          continue
        }

        const distance = Math.abs(rect.top - anchorLine)

        if (distance < closestDistance) {
          closestDistance = distance
          nextActiveId = element.id
        }
      }

      if (!nextActiveId && nearDocumentBottom) {
        nextActiveId = elements[elements.length - 1]?.id || ''
      }

      if (!nextActiveId) return

      setActiveId((currentActiveId) => (currentActiveId === nextActiveId ? currentActiveId : nextActiveId))
    }

    const scheduleUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateActiveSection)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [validSections])

  useEffect(() => {
    const navElement = navRef.current
    const activeLink = linkRefs.current.get(activeId)

    if (!navElement || !activeLink) return
    if (window.matchMedia('(max-width: 1020px)').matches && !isOpen) return

    const navRect = navElement.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const isFullyVisible = linkRect.top >= navRect.top && linkRect.bottom <= navRect.bottom

    if (isFullyVisible) return

    activeLink.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
  }, [activeId, isOpen])

  if (!validSections.length) return null

  return (
    <aside className={`toc-card ${isOpen ? 'is-open' : ''}`} aria-label={title}>
      <button className="toc-toggle" type="button" onClick={() => setIsOpen((open) => !open)}>
        <span>{title}</span>
        <span className="toc-toggle-icon" aria-hidden="true" />
      </button>

      <div className="toc-title">{title}</div>
      <nav className="toc-nav" aria-label="In-page navigation" ref={navRef}>
        {validSections.map((section) => (
          <a
            className={`toc-link ${activeId === section.id ? 'is-active' : ''}`}
            href={`#${section.id}`}
            key={section.id}
            ref={(node) => {
              if (node) {
                linkRefs.current.set(section.id, node)
              } else {
                linkRefs.current.delete(section.id)
              }
            }}
            onClick={(event) => {
              event.preventDefault()
              setIsOpen(false)

              const heading = document.getElementById(section.id)

              if (!heading) return

              heading.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              })

              if (window.location.hash !== `#${section.id}`) {
                window.history.pushState(null, '', `#${section.id}`)
              }

              setActiveId(section.id)
            }}
            aria-current={activeId === section.id ? 'true' : undefined}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default TableOfContents
