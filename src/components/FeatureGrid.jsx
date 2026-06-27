import './FeatureGrid.css'

function FeatureGrid({ features = [] }) {
  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <article className={`feature-card bento-card ${index === 0 ? 'is-large' : ''}`} key={feature.title}>
          <span className="feature-badge">{feature.badge || `0${index + 1}`}</span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  )
}

export default FeatureGrid
