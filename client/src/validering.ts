import { fnr } from '@navikt/fnrvalidator'
import { isValid, isBefore, isAfter, subMonths } from 'date-fns'
import { dato } from './dato'

export const DATO_FOR_LANSERING = '01.08.2022'

export const validering = {
  fnr(verdi: string): boolean {
    return fnr(verdi).status === 'valid'
  },
  dato(verdi: string): boolean {
    return isValid(dato.tilDate(verdi))
  },
  beløp(verdi: string): boolean {
    return /^\d+(,\d{1,2})?$/.test(verdi)
  },
  ikkeIFremtiden(verdi: string, nå: Date): boolean {
    return isBefore(dato.tilDate(verdi), nå)
  },
  ikkeDatoFørLansering(verdi: string): boolean {
    if (verdi === DATO_FOR_LANSERING) {
      return true
    }
    return isBefore(dato.tilDate(DATO_FOR_LANSERING), dato.tilDate(verdi))
  },
  ikkeMerEnnSeksMånederSiden(verdi: string, nå: Date): boolean {
    const seksMånederSiden = subMonths(nå, 6)
    return isAfter(dato.tilDate(verdi), seksMånederSiden)
  },
  bestillingsreferanse(verdi: string): boolean {
    return /^[A-Za-å\d-_/]+$/.test(verdi)
  },

}

export function validator(test: (verdi: string, nå: Date) => boolean, error: string): (verdi: string) => true | string {
  return (verdi) => {
    return test(verdi, new Date()) || error
  }
}
