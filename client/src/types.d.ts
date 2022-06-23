export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Person {
  fnr: string
  navn: string
  alder: number
  kanSøke: boolean
}

export interface HentPersonRequest {
  fnr: string
}

export interface Resultat<T> {
  data?: T
  error?: Error
}