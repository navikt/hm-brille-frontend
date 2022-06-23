import proxy, { ProxyOptions } from 'express-http-proxy'
import type { Auth } from './auth'
import { config } from './config'

function createProxy(host: string, targetAudience: string, auth: Auth, options: ProxyOptions) {
  return proxy(host, {
    parseReqBody: false,
    async proxyReqOptDecorator(requestOptions, req) {
      const { access_token } = await auth.exchangeToken(req, targetAudience)
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
  api(auth: Auth) {
    return createProxy(config.api.brille_api_base_url, config.api.brille_api_target_audience, auth, {
      proxyReqPathResolver(req) {
        return req.originalUrl.replace('/api/', '/')
      },
    })
  },
}
