import { defineConfig } from 'vite'

function privacyAlias() {
  return (req, _res, next) => {
    var path = (req.url || '').split('?')[0]
    if (path === '/privacy' || path === '/privacy/') req.url = '/privacy.html'
    next()
  }
}

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'privacy-route',
      configureServer(server) {
        server.middlewares.use(privacyAlias())
      },
      configurePreviewServer(server) {
        server.middlewares.use(privacyAlias())
      },
    },
  ],
})
