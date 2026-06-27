import './Hero.css'

function Hero() {
  return (
    <section className="hero-section container" id="hero">
      <div className="hero-grid">
        <article className="hero-headline bento-card gradient-strip reveal-card" data-reveal>
          <p className="section-kicker">Expert-level online course</p>
          <h1>
            <span className="hero-brand-highlight">Lawctopus</span>' 6-Month Long Course 'Mastering Contract Drafting and Freelancing'
            [July 1 - December 31]: Register by June 30!
          </h1>
          <p>
            Lawctopus Law School has launched a 6-month long online course on
            'Mastering Contract Drafting and Freelancing', consisting of 54 live
            sessions led by industry experts.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#course-fees">
              Click here to register for the 6-month long course here.
            </a>
            <a className="secondary-button" href="#course-structure-overview">
              Click here to download the course outline.
            </a>
          </div>
        </article>

        <article className="hero-tile bento-card reveal-card" data-reveal>
          <span>Starts</span>
          <strong>July 1</strong>
          <p>July 1 - December 31</p>
        </article>

        <article className="hero-tile bento-card reveal-card" data-reveal>
          <span>Register by</span>
          <strong>June 30</strong>
          <p>Register by June 30!</p>
        </article>

        <article className="hero-tile hero-wide bento-card reveal-card" data-reveal>
          <span>Live Sessions</span>
          <strong>54</strong>
          <p>54 live sessions led by industry experts.</p>
        </article>
      </div>
    </section>
  )
}

export default Hero
