const formatter = new Intl.NumberFormat('nb', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: 'NOK',
  style: 'currency',
})

function formater(verdi?: number | string): string {
  if (!verdi) {
    return ''
  } else if (typeof verdi === 'number') {
    return formatter.format(verdi)
  } else {
    return formatter.format(Number(byttDesimaltegn(verdi)))
  }
}

function byttDesimaltegn(verdi: string): string {
  return verdi.replace(',', '.')
}

export const beløp = {
  formater,
  byttDesimaltegn,
}
