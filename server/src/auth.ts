import { createRemoteJWKSet, jwtVerify } from 'jose'
import jwt from 'jsonwebtoken'
import { JWK } from 'node-jose'
import { Issuer, IssuerMetadata, TokenSet } from 'openid-client'
import { ulid } from 'ulid'
import { URL } from 'url'
import { config, OIDCClientConfiguration } from './config'
import { logger } from './logger'

async function createClient(config: OIDCClientConfiguration) {
  const { issuer: _, private_jwk, ...metadata } = config
  const issuer = await Issuer.discover(config.issuer)
  return {
    metadata: issuer.metadata,
    client: new issuer.Client(metadata),
  }
}

async function privateKeyToPem(jwk: string) {
  const key = await JWK.asKey(jwk)
  return key.toPEM(true)
}

async function createClientAssertion(clientConfig: OIDCClientConfiguration, metadata: IssuerMetadata) {
  if (!clientConfig.private_jwk) {
    return Promise.reject(new Error('clientConfig.private_jwk er ikke satt'))
  }
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      sub: clientConfig.client_id,
      aud: metadata.token_endpoint,
      iss: clientConfig.client_id,
      exp: now + 60, // max 120
      iat: now,
      jti: ulid(),
      nbf: now,
    },
    await privateKeyToPem(clientConfig.private_jwk),
    { algorithm: 'RS256' }
  )
}

function lagJWKSet(metadata: IssuerMetadata) {
  if (!metadata.jwks_uri) {
    throw new Error('metadata.jwks_uri er ikke satt')
  }
  return createRemoteJWKSet(new URL(metadata.jwks_uri))
}

export async function auth() {
  const { metadata: idPortenMetadata, client: idPortenClient } = await createClient(config.auth.idPorten)
  const { metadata: tokenXMetadata, client: tokenXClient } = await createClient(config.auth.tokenX)
  const idPortenJWKSet = lagJWKSet(idPortenMetadata)
  return {
    idPortenJWKSet,
    async verifyToken(token?: string): Promise<boolean> {
      try {
        if (!token) {
          return false
        }

        const result = await jwtVerify(token, idPortenJWKSet, {
          algorithms: ['RS256'],
        })

        if (result.payload.client_id !== config.auth.idPorten.client_id) {
          logger.warn(`client_id er ikke riktig, payload.client_id: ${result.payload.client_id}`)
          return false
        }

        if (result.payload.acr !== 'Level4') {
          logger.warn(`acr er ikke riktig, payload.acr: ${result.payload.acr}`)
          return false
        }

        return true
      } catch (err: unknown) {
        logger.error(`Verifisering av token feilet: ${err}`)
        return false
      }
    },
    async exchangeToken(subjectToken: string, targetAudience: string): Promise<TokenSet> {
      const clientAssertion = await createClientAssertion(config.auth.tokenX, tokenXMetadata)
      try {
        return tokenXClient.grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          token_endpoint_auth_method: 'private_key_jwt',
          subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
          client_assertion: clientAssertion,
          audience: targetAudience,
          subject_token: subjectToken,
        })
      } catch (err: unknown) {
        logger.error(`Feil under token exchange: ${err}`)
        return Promise.reject(err)
      }
    },
  }
}
