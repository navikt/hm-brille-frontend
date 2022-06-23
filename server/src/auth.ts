import { createRemoteJWKSet, jwtVerify } from 'jose'
import jwt from 'jsonwebtoken'
import { JWK } from 'node-jose'
import { Issuer, IssuerMetadata, TokenSet } from 'openid-client'
import { ulid } from 'ulid'
import { URL } from 'url'
import { config, OIDCClientConfiguration } from './config'
import { logger } from './logger'

async function createClient(clientConfig: OIDCClientConfiguration) {
  const issuer = await Issuer.discover(clientConfig.issuer)
  return {
    metadata: issuer.metadata,
    client: new issuer.Client(clientConfig.metadata),
  }
}

async function privateKeyToPem(jwk: string) {
  const key = await JWK.asKey(jwk)
  return key.toPEM(true)
}

async function createClientAssertion(clientConfig: OIDCClientConfiguration, issuerMetadata: IssuerMetadata) {
  const { metadata: clientMetadata } = clientConfig
  if (!clientConfig.private_jwk) {
    return Promise.reject(new Error('clientConfig.private_jwk er ikke satt'))
  }
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      sub: clientMetadata.client_id,
      aud: issuerMetadata.token_endpoint,
      iss: clientMetadata.client_id,
      exp: now + 60, // max 120
      iat: now,
      jti: ulid(),
      nbf: now,
    },
    await privateKeyToPem(clientConfig.private_jwk),
    { algorithm: 'RS256' }
  )
}

function lagJWKSet(issuerMetadata: IssuerMetadata) {
  if (!issuerMetadata.jwks_uri) {
    throw new Error('issuerMetadata.jwks_uri er ikke satt')
  }
  return createRemoteJWKSet(new URL(issuerMetadata.jwks_uri))
}

export async function auth() {
  const { metadata: idPortenMetadata, client: idPortenClient } = await createClient(config.auth.idPorten)
  const { metadata: tokenXMetadata, client: tokenXClient } = await createClient(config.auth.tokenX)
  const idPortenJWKSet = lagJWKSet(idPortenMetadata)
  return {
    async verifyIDPortenToken(idPortenToken?: string): Promise<boolean> {
      try {
        if (!idPortenToken) {
          return false
        }

        const result = await jwtVerify(idPortenToken, idPortenJWKSet, {
          algorithms: ['RS256'],
        })

        if (result.payload.client_id !== config.auth.idPorten.metadata.client_id) {
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
    async exchangeToken(idPortenToken: string, targetAudience: string): Promise<TokenSet> {
      const clientAssertion = await createClientAssertion(config.auth.tokenX, tokenXMetadata)
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
        logger.error(`Feil under token exchange: ${err}`)
        return Promise.reject(err)
      }
    },
  }
}
