import { RequestHandler, rest, setupWorker } from 'msw'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType, SjekkKanSøkeRequest, SjekkKanSøkeResponse } from '../types'

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>('/api/beregn-sats', (req, res, ctx) => {
    const høyreSfære = Number(req.body.høyreSfære)
    const høyreSylinder = Number(req.body.høyreSylinder)
    const venstreSfære = Number(req.body.venstreSfære)
    const venstreSylinder = Number(req.body.venstreSylinder)

    const sfære = Math.max(høyreSfære, venstreSfære)
    const sylinder = Math.max(høyreSylinder, venstreSylinder)

    if (sfære >= 10.25 || sylinder >= 6.25) {
      return res(
        ctx.status(200),
        ctx.json({
          sats: SatsType.SATS_5,
          satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 10,25D og/eller cylinderstyrke ≥ 6,25D',
          beløp: '3975',
        })
      )
    }
    if (sfære >= 8.25 && sfære <= 10 && sylinder <= 6) {
      return res(
        ctx.status(200),
        ctx.json({
          sats: SatsType.SATS_4,
          satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
          beløp: '2700',
        })
      )
    }
    if ((sfære >= 6.25 && sfære <= 8) || (sylinder >= 4.25 && sylinder <= 6)) {
      return res(
        ctx.status(200),
        ctx.json({
          sats: SatsType.SATS_3,
          satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 6,25D ≤ 8,00D og/eller cylinderstyrke ≥ 4,25D ≤ 6,00D',
          beløp: '2325',
        })
      )
    }
    if (sfære >= 4.25 && sfære <= 6 && sylinder <= 4) {
      return res(
        ctx.status(200),
        ctx.json({
          sats: SatsType.SATS_2,
          satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
          beløp: '1800',
        })
      )
    }
    if ((sfære >= 1 && sfære <= 4) || (sylinder >= 1 && sylinder <= 4)) {
      return res(
        ctx.status(200),
        ctx.json({
          sats: SatsType.SATS_1,
          satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 1,00D ≤ 4,00D og/eller cylinderstyrke ≥ 1,00D ≤ 4,00D',
          beløp: '900',
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        sats: SatsType.INGEN,
        satsBeskrivelse: 'N/A',
        beløp: 'N/A',
      })
    )
  }),
  rest.post<SjekkKanSøkeRequest, {}, SjekkKanSøkeResponse>('/api/sjekk-kan-soke', (req, res, ctx) => {
    const { fnr } = req.body
    if (fnr === '400') {
      return res(ctx.status(400))
    }
    if (fnr === '401') {
      return res(ctx.status(401))
    }
    if (fnr === '404') {
      return res(ctx.status(404))
    }
    if (fnr === '500') {
      return res(ctx.status(500))
    }
    if (fnr === '123') {
      return res(
        ctx.status(200),
        ctx.json({
          fnr,
          navn: 'Pippi Langstrømpe',
          kanSøke: false,
          alder: 9,
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        fnr,
        navn: 'Albert Åberg',
        kanSøke: true,
        alder: 12,
      })
    )
  }),
  rest.get('/api/orgnr', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sisteBrukteOrg: { orgnummer: '123456', navn: 'Brillehuset Kristiansand' },
        tidligereBrukeOrg: [{ orgnummer: '123456', navn: 'Brillehuset Kristiansand' }],
      })
    )
  }),
  rest.get('/api/enhetsregisteret/enheter/:organisasjonsnummer', (req, res, ctx) => {
    const orgnummer = req.params.organisasjonsnummer

    if (orgnummer === '404') {
      return res(
        ctx.status(200),
        ctx.json({
          organisasjonsnummer: '404404',
          navn: 'Manglerud Avtale',
          adresse: 'Mangerudveien 6, 0942 Oslo',
          harNavAvtale: false,
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        organisasjonsnummer: '111222333',
        navn: 'Mitt Brille Land',
        adresse: 'Brillestangen 34, 4269 Brillestad',
        harNavAvtale: true,
      })
    )
  }),
]

export const worker = setupWorker(...handlers)
