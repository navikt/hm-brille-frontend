import type { ClientMetadata } from 'openid-client'
import path from 'path'

export interface OIDCClientConfiguration extends ClientMetadata {
  issuer: string
  private_jwk?: string
}

const idPorten: OIDCClientConfiguration = {
  issuer: process.env.IDPORTEN_WELL_KNOWN_URL || 'http://localhost:8080/default',
  client_id: process.env.IDPORTEN_CLIENT_ID || 'default',
}

const tokenX: OIDCClientConfiguration = {
  issuer: process.env.TOKEN_X_WELL_KNOWN_URL || 'http://localhost:8080/default',
  client_id: process.env.TOKEN_X_CLIENT_ID || 'default',
}

export interface APIConfiguration {
  baseUrl: string
  audience: string
}

const brille: APIConfiguration = {
  baseUrl: process.env.BRILLE_API_URL || 'http://localhost:9090',
  audience: process.env.BRILLE_API_AUDIENCE || 'local:hm-brille-api',
}

export const config = {
  env: process.env.NODE_ENV,
  cluster: process.env.NAIS_CLUSTER_NAME,
  basePath: '/',
  buildPath: path.join(__dirname, '../../client/dist'),
  api: {
    brille,
  },
  auth: {
    idPorten,
    tokenX,
  },
}
