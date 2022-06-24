import proxy, { ProxyOptions } from 'express-http-proxy'
import type { ExchangeToken } from './auth'
import { config } from './config'

function createProxy(host: string, targetAudience: string, exchangeToken: ExchangeToken, options: ProxyOptions) {
  return proxy(host, {
    parseReqBody: false,
    async proxyReqOptDecorator(requestOptions, req) {
      const { access_token } = await exchangeToken(req, targetAudience)
      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Bearer ${access_token}`,
      }
      if (config.nais_cluster_name === 'dev-gcp') {
        requestOptions.headers['x-optiker-fnr'] = '01117302624'
      }
      return requestOptions
    },
    ...options,
  })
}

export const proxyHandlers = {
  api(exchangeToken: ExchangeToken) {
    return createProxy(config.api.brille_api_base_url, config.api.brille_api_target_audience, exchangeToken, {
      proxyReqPathResolver(req) {
        return req.originalUrl.replace('/api/', '/')
      },
    })
  },
}
