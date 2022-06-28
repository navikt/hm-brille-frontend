import type { HttpError } from './error'

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Resultat<T> {
  data?: Nullable<T>
  error?: HttpError
}

export interface SjekkKanSøkeRequest {
  fnr: string
}
export interface SjekkKanSøkeResponse {
  fnr: string
  navn: string
  alder: number
  kanSøke: boolean
}

export interface BeregnSatsRequest {
    høyreSfære: string
    høyreSylinder: string
    venstreSfære: string
    venstreSylinder: string
}

export interface BeregnSatsResponse {
    sats: string
    satsBeskrivelse: string
    beløp: string
}