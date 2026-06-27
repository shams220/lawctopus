import { useState } from 'react'
import './FAQAccordion.css'

function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <article className={`faq-item bento-card ${isOpen ? 'is-open' : ''}`} key={item.question}>
            <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default FAQAccordion
