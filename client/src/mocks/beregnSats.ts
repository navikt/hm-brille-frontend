import { BeregnSatsResponse, Brilleseddel, SatsType } from '../types'

export function beregnSats(brilleseddel: Brilleseddel): BeregnSatsResponse {
  const høyreSfære = Number(brilleseddel.høyreSfære)
  const høyreSylinder = Number(brilleseddel.høyreSylinder)
  const venstreSfære = Number(brilleseddel.venstreSfære)
  const venstreSylinder = Number(brilleseddel.venstreSylinder)

  const sfære = Math.max(høyreSfære, venstreSfære)
  const sylinder = Math.max(høyreSylinder, venstreSylinder)

  if (sfære >= 10.25 || sylinder >= 6.25) {
    return {
      sats: SatsType.SATS_5,
      satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 10,25D og/eller cylinderstyrke ≥ 6,25D',
      satsBeløp: '3975',
    }
  }
  if (sfære >= 8.25 && sfære <= 10 && sylinder <= 6) {
    return {
      sats: SatsType.SATS_4,
      satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
      satsBeløp: '2700',
    }
  }
  if ((sfære >= 6.25 && sfære <= 8) || (sylinder >= 4.25 && sylinder <= 6)) {
    return {
      sats: SatsType.SATS_3,
      satsBeskrivelse:
        'Briller med sfærisk styrke på minst ett glass ≥ 6,25D ≤ 8,00D og/eller cylinderstyrke ≥ 4,25D ≤ 6,00D',
        satsBeløp: '2325',
    }
  }
  if (sfære >= 4.25 && sfære <= 6 && sylinder <= 4) {
    return {
      sats: SatsType.SATS_2,
      satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
      satsBeløp: '1800',
    }
  }
  if ((sfære >= 1 && sfære <= 4) || (sylinder >= 1 && sylinder <= 4)) {
    return {
      sats: SatsType.SATS_1,
      satsBeskrivelse:
        'Briller med sfærisk styrke på minst ett glass ≥ 1,00D ≤ 4,00D og/eller cylinderstyrke ≥ 1,00D ≤ 4,00D',
        satsBeløp: '900',
    }
  }
  return {
    sats: SatsType.INGEN,
    satsBeskrivelse: 'N/A',
    satsBeløp: 'N/A',
  }
}
