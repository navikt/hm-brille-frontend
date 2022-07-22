import { formatISO, parse } from 'date-fns'

export const dato = {
  tilDate(verdi: string): Date {
    return parse(verdi, 'dd.MM.yyyy', new Date())
  },
  tilISO(verdi: string): string {
    return !verdi ? verdi : formatISO(this.tilDate(verdi), { representation: 'date' })
  },
}
