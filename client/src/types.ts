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
  begrunnelse?: AvvisningsType
}

export enum AvvisningsType {
  ALDER = 'ALDER',
  ANNET = 'ANNET',
}

export interface VirksomhetResponse {
  organisasjonsnummer: string
  navn: string
  adresse: string
  harNavAvtale: boolean
}

export interface TidligereBrukteVirksomhetResponse {
  sistBrukteOrganisasjon: TidligereBruktVirksomhet
  tidligereBrukteOrganisasjoner: TidligereBruktVirksomhet[]
}

export interface TidligereBruktVirksomhet {
  orgnummer: string
  navn: string
}

export interface BeregnSatsRequest {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

export interface BeregnSatsResponse {
  sats: SatsType
  satsBeskrivelse: string
  beløp: string
}

export enum SatsType {
  SATS_1 = 'SATS_1',
  SATS_2 = 'SATS_2',
  SATS_3 = 'SATS_3',
  SATS_4 = 'SATS_4',
  SATS_5 = 'SATS_5',
  INGEN = 'INGEN',
}
