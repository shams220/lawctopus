import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container reveal-card" data-reveal>
        <div>
          <a className="footer-brand" href="#hero">
            <img src="/course-assets/Lawctopus-1.webp" alt="Lawctopus Law School" />
          </a>
          <p>
            Lawctopus Law School has taught a wide range of practical skills to
            over 20,000+ law students, young lawyers, professionals,
            academicians, and business people.
          </p>
        </div>

        <div className="footer-links">
          <a href="#about-course">About</a>
          <a href="#course-fees">Pricing</a>
          <a href="#questions">Questions</a>
          <a href="#">Facebook</a>
          <a href="#">X</a>
          <a href="#">YouTube</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
