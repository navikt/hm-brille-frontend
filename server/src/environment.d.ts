export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production'
      NAIS_CLUSTER_NAME?: 'labs-gcp' | 'dev-gcp' | 'prod-gcp'

      API_URL?: string
      API_AUDIENCE?: string

      IDPORTEN_ISSUER?: string
      IDPORTEN_CLIENT_ID?: string
      IDPORTEN_TOKEN_ENDPOINT?: string
      IDPORTEN_JWKS_URI?: string

      TOKEN_X_ISSUER?: string
      TOKEN_X_CLIENT_ID?: string
      TOKEN_X_TOKEN_ENDPOINT?: string
      TOKEN_X_PRIVATE_JWK?: string

      PORT?: string

      GIT_COMMIT?: string

      USE_MSW?: 'true' | 'false'
    }
  }
}
