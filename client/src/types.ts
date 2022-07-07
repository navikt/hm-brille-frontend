import type { HttpError } from './error'

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Resultat<T> {
  data?: Nullable<T>
  error?: HttpError
  loading?: boolean
}

export interface HentBrukerRequest {
  fnr: string
}

export interface HentBrukerResponse {
  fnr: string
  navn: string
  alder: number
}

export enum AvvisningsType {
  ALDER = 'ALDER',
  ANNET = 'ANNET',
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

export interface VilkårsgrunnlagRequest {
  orgnr: string
  fnrBruker: string
  beregnSats: {
    høyreSfære: string
    høyreSylinder: string
    venstreSfære: string
    venstreSylinder: string
  }
  bestillingsdato: string
  brillepris: number
}

export interface VilkårsgrunnlagResponse {
  resultat: VilkårsgrunnlagResultat
}

export enum VilkårsgrunnlagResultat {
  JA = 'JA',
  NEI = 'NEI',
  KANSKJE = 'KANSKJE',
}

export interface SøknadRequest extends VilkårsgrunnlagRequest {
  bestillingsreferanse: string
}

export interface SøknadResponse {
  vedtakId: string
}

export interface VirksomhetResponse {
  organisasjonsnummer: string
  kontonr: string
  harNavAvtale: boolean
  orgnavn: string
  forretningsadresse?: Postadresse
  erOptikerVirksomet: Boolean
}

export interface Postadresse {
  postnummer: string
  poststed: string
  adresse: string[]
}

export enum SatsType {
  SATS_1 = 'SATS_1',
  SATS_2 = 'SATS_2',
  SATS_3 = 'SATS_3',
  SATS_4 = 'SATS_4',
  SATS_5 = 'SATS_5',
  INGEN = 'INGEN',
}
