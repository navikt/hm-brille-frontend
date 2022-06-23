declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production'
    NAIS_CLUSTER_NAME?: 'labs-gcp' | 'dev-gcp' | 'prod-gcp'

    BRILLE_API_URL?: string
    BRILLE_API_AUDIENCE?: string

    IDPORTEN_ISSUER?: string
    IDPORTEN_CLIENT_ID?: string

    TOKEN_X_ISSUER?: string
    TOKEN_X_CLIENT_ID?: string
    TOKEN_X_PRIVATE_JWK?: string

    PORT?: string

    GIT_COMMIT?: string

    USE_MSW?: 'true' | 'false'
  }
}

declare namespace Express {
  export interface Request {
    bearerToken(): string | undefined
  }
}
