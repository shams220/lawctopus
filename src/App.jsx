import { useEffect, useState } from 'react'
import './styles/variables.css'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import TableOfContents from './components/TableOfContents'
import OriginalArticle from './components/OriginalArticle'
import Footer from './components/Footer'
import originalSections from './content/originalSections'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('lawctopus-theme')

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    localStorage.setItem('lawctopus-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let rafId = 0

    const updateScrollState = () => {
      const documentElement = document.documentElement
      const maxScroll = Math.max(documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(window.scrollY / maxScroll, 1)

      setScrollProgress(progress)
      setIsScrolled(window.scrollY > 12)
      rafId = 0
    }

    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="page-shell" data-theme={theme}>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <Header theme={theme} onToggleTheme={toggleTheme} isScrolled={isScrolled} />
      <main>
        <Hero />

        <div className="main-layout container">
          <div className="content-stack">
            <OriginalArticle />
          </div>

          <div className="toc-column">
            <TableOfContents sections={originalSections} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
