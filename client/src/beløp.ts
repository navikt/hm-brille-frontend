export const beløp = {
  tilNumber(verdi: string): number {
    if (typeof verdi !== 'string') {
      return NaN
    }
    return Number(verdi.replace(',', '.'))
  },
  tilString(verdi: number): string {
    return verdi.toString().replace('.', ',')
  },
}
