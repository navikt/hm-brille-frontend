import proxy, { ProxyOptions } from 'express-http-proxy'
import { auth } from './auth'
import { APIConfiguration, config } from './config'

function createProxy(apiConfig: APIConfiguration, options: ProxyOptions) {
  return proxy(apiConfig.baseUrl, {
    parseReqBody: false,
    async proxyReqOptDecorator(requestOptions, req) {
      const bearerToken = req.bearerToken()
      if (config.cluster === 'labs-gcp' || !bearerToken) {
        return requestOptions
      }
      const { exchangeToken } = await auth()
      const { access_token } = await exchangeToken(bearerToken, apiConfig.audience)
      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Bearer ${access_token}`,
      }
      return requestOptions
    },
    ...options,
  })
}

export const proxyHandlers = {
  api() {
    return createProxy(config.api.brille, {
      proxyReqPathResolver(req) {
        return req.originalUrl.replace('/api/', '/')
      },
    })
  },
}
