import './PricingComparison.css'

function PricingComparison({ plans = [] }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <article className={`pricing-card bento-card ${plan.recommended ? 'is-recommended' : ''}`} key={plan.name}>
          {plan.recommended ? <span className="recommended-pill">Recommended</span> : null}
          <h3>{plan.name}</h3>
          <p className="pricing-value">{plan.price}</p>
          <p className="pricing-note">{plan.note}</p>
          <ul>
            {plan.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className={plan.recommended ? 'primary-button' : 'secondary-button'} href="#pricing">
            {plan.cta || 'View Plan'}
          </a>
        </article>
      ))}
    </div>
  )
}

export default PricingComparison
