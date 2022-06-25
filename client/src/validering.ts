import { fnr } from '@navikt/fnrvalidator'

export function validerFnr(value: string): string | true {
  const resultat = fnr(value)
  if (resultat.status === 'invalid') {
    return 'Ugyldig fødselsnummer'
  }
  return true
}
