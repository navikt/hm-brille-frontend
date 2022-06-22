import proxy, { ProxyOptions } from 'express-http-proxy'

function options(options: ProxyOptions = {}): ProxyOptions {
  return {
    parseReqBody: false,
    ...options,
  }
}

export const proxyHandlers = {
  api() {
    return proxy(
      process.env.API_URL || 'http://localhost:9090',
      options({
        proxyReqPathResolver(req) {
          return req.originalUrl.replace('/api/', '/')
        },
      })
    )
  },
}
