const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
const nextI18next = require('./i18n')

const dev = process.env.NODE_ENV !== 'production'

const port = process.env.PORT || 3000
const app = next({ dev })

const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  if (dev) {
    const proxyMiddleware = require('http-proxy-middleware')

    server.use(proxyMiddleware('/api', {
      target: 'http://backend.sh.local:4000/api',
      pathRewrite: { '^/api': '/' },
      changeOrigin: true
    }))
  }

  server.use(nextI18NextMiddleware(nextI18next))
  server.get('*', (req, res) => handle(req, res))

  server.listen(port)
  console.log(`Ready on http://localhost:${port}`)
})()

