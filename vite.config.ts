import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Routes served by the Silversands React app (silversands.html); everything else is the quiz (index.html).
// Keep in sync with the rewrites in vercel.json.
const silversandsRoutes = ['/silversands', '/thank-you']

function silversandsDevRoutes(): Plugin {
  return {
    name: 'silversands-dev-routes',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = (req.url ?? '').split('?')[0].replace(/\/$/, '')
        if (silversandsRoutes.includes(path)) req.url = '/silversands.html'
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), silversandsDevRoutes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        silversands: resolve(__dirname, 'silversands.html'),
      },
    },
  },
})
