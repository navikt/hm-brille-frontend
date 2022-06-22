import { createRemoteJWKSet, jwtVerify } from 'jose'
import jwt from 'jsonwebtoken'
import { JWK } from 'node-jose'
import { Issuer, TokenSet } from 'openid-client'
import { ulid } from 'ulid'
import { URL } from 'url'
import { config, OIDCClientConfiguration } from './config'
import { logger } from './logger'

async function createClient(config: OIDCClientConfiguration) {
  const issuer = await Issuer.discover(config.issuer)
  return new issuer.Client({
    client_id: config.client_id,
  })
}

async function privateKeyToPem(jwk: string) {
  const key = await JWK.asKey(jwk)
  return key.toPEM(true)
}

async function createClientAssertion() {
  const now = Math.floor(Date.now() / 1000)
  const tokenXConfig = config.auth.tokenX
  return jwt.sign(
    {
      sub: tokenXConfig.client_id,
      aud: tokenXConfig.token_endpoint,
      iss: tokenXConfig.client_id,
      exp: now + 60, // max 120
      iat: now,
      jti: ulid(),
      nbf: now,
    },
    await privateKeyToPem(tokenXConfig.private_jwk || ''),
    { algorithm: 'RS256' }
  )
}

export async function auth() {
  const tokenXClient = await createClient(config.auth.tokenX)
  return {
    async verifyToken(token?: string): Promise<boolean> {
      if (!token) {
        return false
      }
      try {
        const jwkSet = createRemoteJWKSet(new URL(config.auth.idPorten.jwks_uri || ''))
        const result = await jwtVerify(token, jwkSet, {
          algorithms: ['RS256'],
        })

        if (result.payload.x !== config.auth.idPorten.client_id) {
          logger.warn('client_id er ikke riktig')
          return false
        }

        if (result.payload.acr === 'Level4') {
          logger.warn('acr er ikke Level4')
          return false
        }

        return true
      } catch (err: unknown) {
        return false
      }
    },
    async exchangeToken(idPortenToken: string, targetAudience: string): Promise<TokenSet> {
      const clientAssertion = await createClientAssertion()
      try {
        return tokenXClient.grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          token_endpoint_auth_method: 'private_key_jwt',
          subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
          client_assertion: clientAssertion,
          audience: targetAudience,
          subject_token: idPortenToken,
        })
      } catch (err: unknown) {
        logger.error(`Error while exchanging token: ${err}`)
        return Promise.reject(err)
      }
    },
  }
}
