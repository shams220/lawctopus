import './Header.css'

function Header({ theme = 'light', onToggleTheme, isScrolled = false }) {
  const links = [
    { href: '#about-course', label: 'About' },
    { href: '#why-join', label: 'Benefits' },
    { href: '#course-fees', label: 'Fees' },
    { href: '#month-wise-structure', label: 'Curriculum' },
    { href: '#course-developers-faculty', label: 'Faculty' },
  ]

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="header-inner container" aria-label="Primary navigation">
        <a className="header-brand" href="#hero">
          <img src="/course-assets/Lawctopus-1.webp" alt="Lawctopus Law School" />
        </a>

        <div className="header-links">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="header-actions">
          <a className="header-cta primary-button" href="#course-fees">
            Enroll Now
          </a>

          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-thumb">
                {theme === 'dark' ? (
                  <span className="theme-toggle-icon theme-toggle-icon-moon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M15.35 3.2a7.9 7.9 0 1 0 5.45 13.48A9 9 0 0 1 15.35 3.2Z" />
                    </svg>
                  </span>
                ) : (
                  <span className="theme-toggle-icon theme-toggle-icon-sun" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="4.5" />
                      <path d="M12 2.75v2.1M12 19.15v2.1M4.85 4.85l1.49 1.49M17.66 17.66l1.49 1.49M2.75 12h2.1M19.15 12h2.1M4.85 19.15l1.49-1.49M17.66 6.34l1.49-1.49" />
                    </svg>
                  </span>
                )}
              </span>
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
