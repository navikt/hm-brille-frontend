import type { ClientMetadata } from 'openid-client'
import path from 'path'

export interface OIDCClientConfiguration extends ClientMetadata {
  issuer: string
  token_endpoint: string
  jwks_uri?: string
  private_jwk?: string
}

const idPorten: OIDCClientConfiguration = {
  issuer: process.env.IDPORTEN_ISSUER || 'http://localhost:8080/default',
  token_endpoint: process.env.IDPORTEN_TOKEN_ENDPOINT || '',
  jwks_uri: process.env.IDPORTEN_JWKS_URI,
  client_id: process.env.IDPORTEN_CLIENT_ID || 'default',
}

const tokenX: OIDCClientConfiguration = {
  issuer: process.env.TOKEN_X_ISSUER || 'http://localhost:8080/default',
  token_endpoint: process.env.TOKEN_X_TOKEN_ENDPOINT || '',
  private_jwk: process.env.TOKEN_X_PRIVATE_JWK,
  client_id: process.env.TOKEN_X_CLIENT_ID || 'default',
}

export const config = {
  env: process.env.NODE_ENV,
  cluster: process.env.NAIS_CLUSTER_NAME,
  apiUrl: process.env.API_URL,
  apiAudience: process.env.API_AUDIENCE,
  basePath: '/',
  buildPath: path.join(__dirname, '../../client/dist'),
  auth: {
    idPorten,
    tokenX,
  },
}
