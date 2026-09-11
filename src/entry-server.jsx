import { renderToString } from 'react-dom/server'

import Site from './Site.jsx'
import { STATIC_ROUTES, resolveRoute } from './routes.js'

export function getStaticRoutes() {
  return STATIC_ROUTES
}

export function render(pathname = '/') {
  const route = resolveRoute(pathname)
  return renderToString(<Site route={route} concept={import.meta.env.VITE_DESIGN_CONCEPT === 'v2'} />)
}
