export type Nullable<T> = T | null

export interface Person {
  fnr: string
  fornavn: string
  etternavn: string
}

export interface HentPersonRequest {
  fnr: string
}

export interface Resultat<T> {
  data?: T
  error?: Error
}
