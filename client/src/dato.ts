import { formatISO, isMatch, parse } from 'date-fns'

const formatter = new Intl.DateTimeFormat('nb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function formater(verdi?: Date | number | string): string {
  return verdi ? formatter.format(new Date(verdi)) : ''
}

function tilDate(verdi: string): Date {
  if (isMatch(verdi, 'ddMMyyyy')) {
    return parse(verdi, 'ddMMyyyy', new Date())
  }
  return parse(verdi, 'dd.MM.yyyy', new Date())
}

function tilISO(verdi: string): string {
  return !verdi ? verdi : formatISO(tilDate(verdi), { representation: 'date' })
}

function nå(): string {
  return formater(Date.now())
}

export const dato = {
  formater,
  tilDate,
  tilISO,
  nå,
}
