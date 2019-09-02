const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const port = process.env.PORT || 3010
const app = next({ dev })

const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  if (dev) {
    const proxyMiddleware = require('http-proxy-middleware')

    server.use(proxyMiddleware('/api', {
      target: 'http://localhost:6000/api',
      pathRewrite: { '^/api': '/' },
      changeOrigin: true
    }))
  }

  server.get('*', (req, res) => handle(req, res))

  server.listen(port)
  console.log(`Ready on http://localhost:${port}`)
})()

