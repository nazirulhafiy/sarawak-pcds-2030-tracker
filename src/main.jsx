import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import Site from './Site.jsx'
import { resolveRoute } from './routes.js'

const navigationEntry = window.performance.getEntriesByType('navigation')[0]

if (navigationEntry?.type === 'reload') {
  const resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  resetScroll()
  window.addEventListener('pageshow', () => {
    resetScroll()
    window.requestAnimationFrame(() => {
      resetScroll()

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    })
  }, { once: true })
}

const container = document.getElementById('root')
const route = resolveRoute(window.location.pathname, import.meta.env.BASE_URL)
// Compatibility alias for links from the original design review.
const requestedConcept = new URLSearchParams(window.location.search).get('concept')
const showConcept = import.meta.env.VITE_DESIGN_CONCEPT === 'v2' || (import.meta.env.DEV && ['v2', 'xai'].includes(requestedConcept))
if (showConcept) {
  await import('./v2-interface.css')
  document.documentElement.dataset.concept = 'v2'
}
const app = (
  <StrictMode>
    <Site route={route} concept={showConcept} />
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
