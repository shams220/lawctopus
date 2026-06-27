import { useEffect, useRef } from 'react'
import articleHtml from '../content/articleHtml'
import originalSections from '../content/originalSections'
import './OriginalArticle.css'

function addSectionIds(html) {
  let index = 0

  return html.replace(/<h2>/g, (match) => {
    const section = originalSections[index]
    index += 1

    return section ? `<h2 id="${section.id}">` : match
  })
}

function OriginalArticle() {
  const articleRef = useRef(null)

  useEffect(() => {
    const articleElement = articleRef.current
    if (!articleElement) return undefined

    if (!articleElement.dataset.chunked) {
      const originalNodes = Array.from(articleElement.children)
      const fragment = document.createDocumentFragment()
      let currentChunk = document.createElement('div')
      currentChunk.className = 'article-chunk article-reveal'
      currentChunk.dataset.revealChunk = 'true'
      let chunkIndex = 0

      const appendCurrentChunk = () => {
        if (currentChunk.children.length) {
          currentChunk.style.transitionDelay = `${Math.min(chunkIndex * 90, 720)}ms`
          fragment.appendChild(currentChunk)
          chunkIndex += 1
        }
      }

      originalNodes.forEach((node) => {
        if (node.tagName === 'H2' && currentChunk.children.length) {
          appendCurrentChunk()
          currentChunk = document.createElement('div')
          currentChunk.className = 'article-chunk article-reveal'
          currentChunk.dataset.revealChunk = 'true'
        }

        if (node.tagName === 'H2' && !currentChunk.children.length) {
          currentChunk.className = 'article-chunk article-reveal'
          currentChunk.dataset.revealChunk = 'true'
        }

        currentChunk.appendChild(node)
      })

      appendCurrentChunk()

      articleElement.innerHTML = ''
      articleElement.appendChild(fragment)
      articleElement.dataset.chunked = 'true'
    }

    const revealItems = Array.from(articleElement.querySelectorAll('[data-reveal-chunk]'))

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = item.style.transitionDelay || `${Math.min(index * 90, 720)}ms`
    })

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
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.14,
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <article
      className="original-article bento-card reveal-card is-visible"
      ref={articleRef}
      dangerouslySetInnerHTML={{ __html: addSectionIds(articleHtml) }}
    />
  )
}

export default OriginalArticle
