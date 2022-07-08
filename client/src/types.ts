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
  alder: number
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
  sistBrukteOrganisasjon: TidligereBruktVirksomhet | undefined
  tidligereBrukteOrganisasjoner: TidligereBruktVirksomhet[] | undefined
}

export interface TidligereBruktVirksomhet {
  orgnummer: string
  navn: string
  forretningsadresse: string | undefined
  beliggenhetsadresse: string | undefined
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
  beløp: string
}

export interface Vilkårsgrunnlag {
  orgnr: string
  fnrBruker: string
  brilleseddel: Brilleseddel
  bestillingsdato: string
  brillepris: number
}

export interface VilkårsgrunnlagRequest extends Vilkårsgrunnlag {}

export interface VilkårsgrunnlagResponse {
  resultat: VilkårsgrunnlagResultat
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
  vedtakId: string
}

export interface VirksomhetResponse {
  organisasjonsnummer: string
  kontonr: string
  harNavAvtale: boolean
  orgnavn: string
  forretningsadresse?: Postadresse
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
