import type { HttpError } from './error'

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Resultat<T> {
  data?: T
  error?: HttpError
  loading?: boolean
}

export interface HentBrukerRequest {
  fnr: string
}

export interface HentBrukerResponse {
  fnr: string
  navn: string
  alder?: number
}

export enum AvvisningsType {
  ALDER = 'ALDER',
  ANNET = 'ANNET',
}

export interface Postadresse {
  postnummer: string
  poststed: string
  adresse: string[]
}

export interface TidligereBrukteVirksomheterResponse {
  sistBrukteOrganisasjon?: TidligereBruktVirksomhet | undefined
  tidligereBrukteOrganisasjoner: TidligereBruktVirksomhet[] | undefined
}

export interface HarLestOgGodtattVilkårResponse {
  godtatt: boolean
}

export interface TidligereBruktVirksomhet {
  orgnr: string
  navn: string
  adresse: string | undefined
}

export interface Brilleseddel {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

export interface BeregnSatsRequest extends Brilleseddel {}

export interface BeregnSatsResponse {
  sats: SatsType
  satsBeskrivelse: string
  satsBeløp: string
}

export interface Vilkårsgrunnlag {
  orgnr: string
  fnrBarn: string
  brilleseddel: Brilleseddel
  bestillingsdato: string
  brillepris: number
}

export interface VilkårsgrunnlagRequest extends Vilkårsgrunnlag {}

export interface VilkårsgrunnlagResponse {
  resultat: VilkårsgrunnlagResultat
  sats: SatsType
  satsBeskrivelse: string
  satsBeløp: string
  beløp: string
}

export enum VilkårsgrunnlagResultat {
  JA = 'JA',
  NEI = 'NEI',
  KANSKJE = 'KANSKJE',
}

export interface SøknadRequest {
  vilkårsgrunnlag: Vilkårsgrunnlag
  bestillingsreferanse: string
  brukersNavn: string
  orgAdresse: string
  orgNavn: string
}

export interface SøknadResponse {
  id: string
  orgnr: string
  bestillingsdato: string
  brillepris: string
  bestillingsreferanse: string
  behandlingsresultat: string
  sats: string
  satsBeløp: string
  satsBeskrivelse: string
  beløp: string
  opprettet: string
}

export interface VirksomhetResponse {
  orgnr: string
  orgNavn: string
  kontonr: string
  aktiv: boolean
  adresse?: string
  erOptikerVirksomhet: boolean
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
