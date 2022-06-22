import proxy, { ProxyOptions } from 'express-http-proxy'
import { auth } from './auth'
import { config } from './config'

function options(options: ProxyOptions = {}): ProxyOptions {
  return {
    parseReqBody: false,
    async proxyReqOptDecorator(options, req) {
      if (config.cluster !== 'labs-gcp') {
        const idPortenToken = req.headers['authorization']?.split(' ')[1]
        const { exchangeToken } = await auth()
        const { access_token } = await exchangeToken(idPortenToken as string, config.apiAudience || '')
        if (options.headers) {
          options.headers.Authorization = `Bearer ${access_token}`
        }
      }
      return options
    },
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
