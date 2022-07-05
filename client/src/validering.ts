import { fnr } from '@navikt/fnrvalidator'

export function validerFnr(value: string): string | true {
  const resultat = fnr(value)
  if (resultat.status === 'invalid') {
    return 'Ugyldig fødselsnummer'
  }
  return true
}

export function validerDato(datoString: string): boolean {
  // dd.mm.yyyy
  const datoRegexp = new RegExp(/^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/)
  return datoRegexp.test(datoString)
}

export function validerPris(prisString: string): boolean {
  if (typeof prisString !== 'string') return false

  if (prisString.trim() === '') {
    return false
  }

  return !Number.isNaN(Number(prisString))
}
