import { RequestHandler, rest } from 'msw'
import { apiUrl } from '../http'
import { OversiktDetaljerResponse, OversiktResponse } from '../types'

export const handlers: RequestHandler[] = [
  rest.get<{}, {}, OversiktResponse>(apiUrl('/oversikt'), (req, res, ctx) => {
    let page = parseInt(req.url.searchParams.get('page') || '1')
    if (!page || isNaN(page)) page = 1

    let itemsPerPage = 10

    let data = []
    for (let i = 0; i < 8; i++)
      data.push([
        {
          description: 'Innsendt: 09. august 2022',
          id: 99,
          orgnavn: 'Brillehuset',
          orgnr: '123 456 789',
          barnsNavn: 'Sedat Kronjuvel',
          barnsFnr: '15084300133',
          barnsAlder: 12,
          høyreSfære: 1.25,
          høyreSylinder: -1.0,
          venstreSfære: 1.0,
          venstreSylinder: -1.0,
          bestillingsdato: '2022-08-09',
          brillepris: 12345.0,
          beløp: 750.0,
          bestillingsreferanse: 'hlkefhuibv',
          satsNr: '3',
          satsBeløp: 750,
          satsBeskrivelse:
            'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          opprettet: '2022-08-09T14:45:00+02:00',
        },
        {
          id: 100,
          orgnavn: 'Brillehuset',
          orgnr: '123 456 789',
          barnsNavn: 'Pippi Langstrømpe',
          barnsFnr: '15084300133',
          barnsAlder: 12,
          høyreSfære: 1.25,
          høyreSylinder: -1.0,
          venstreSfære: 1.0,
          venstreSylinder: -1.0,
          bestillingsdato: '2022-08-08',
          brillepris: 12345.0,
          beløp: 750.0,
          bestillingsreferanse: 'hlkefhuibv',
          satsNr: '3',
          satsBeløp: 750,
          satsBeskrivelse:
            'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          utbetalingsdato: '2022-08-10T08:00:00+02:00',
          opprettet: '2022-08-09T14:45:00+02:00',
        },
        {
          id: 101,
          description: 'Innsendt: 07. august 2022',
          orgnavn: 'Brillehuset',
          orgnr: '123 456 789',
          barnsNavn: 'Harald Rustibus',
          barnsFnr: '15084300133',
          barnsAlder: 12,
          høyreSfære: 1.25,
          høyreSylinder: -1.0,
          venstreSfære: 1.0,
          venstreSylinder: -1.0,
          bestillingsdato: '2022-08-07',
          brillepris: 12345.0,
          beløp: 750.0,
          bestillingsreferanse: 'hlkefhuibv',
          satsNr: '3',
          satsBeløp: 750,
          satsBeskrivelse:
            'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          opprettet: '2022-08-07T14:45:00+02:00',
          slettet: '2022-08-10T09:10:12+02:00',
        },
      ])
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        numberOfPages: Math.ceil(data.flat().length / itemsPerPage),
        itemsPerPage: itemsPerPage,
        totalItems: data.flat().length,
        items: data.flat().slice(itemsPerPage * (page - 1), itemsPerPage * page),
      })
    )
  }),
  rest.get<{}, { vedtakId: string }, OversiktDetaljerResponse>(apiUrl('/oversikt/:vedtakId'), (req, res, ctx) => {
    if (req.params.vedtakId == '100') {
      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json({
          id: 1,
          orgnavn: 'Brillehuset',
          orgnr: '123 456 789',
          barnsNavn: 'Sedat Kronjuvel',
          barnsFnr: '15084300133',
          barnsAlder: 12,
          høyreSfære: 1.25,
          høyreSylinder: -1.0,
          venstreSfære: 1.0,
          venstreSylinder: -1.0,
          bestillingsdato: '2022-08-02',
          brillepris: 12345.0,
          beløp: 750.0,
          bestillingsreferanse: 'hlkefhuibv',
          satsNr: '3',
          satsBeløp: 750,
          satsBeskrivelse:
            'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          utbetalingsdato: '2022-08-10T08:00:00+02:00',
          opprettet: '2022-08-07T14:45:00+02:00',
        })
      )
    }

    if (req.params.vedtakId == '101') {
      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json({
          id: 1,
          orgnavn: 'Brillehuset',
          orgnr: '123 456 789',
          barnsNavn: 'Sedat Kronjuvel',
          barnsFnr: '15084300133',
          barnsAlder: 12,
          høyreSfære: 1.25,
          høyreSylinder: -1.0,
          venstreSfære: 1.0,
          venstreSylinder: -1.0,
          bestillingsdato: '2022-08-02',
          brillepris: 12345.0,
          beløp: 750.0,
          bestillingsreferanse: 'hlkefhuibv',
          satsNr: '3',
          satsBeløp: 750,
          satsBeskrivelse:
            'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          opprettet: '2022-08-07T14:45:00+02:00',
          slettet: '2022-08-10T09:10:12+02:00',
        })
      )
    }

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        id: 1,
        orgnavn: 'Brillehuset',
        orgnr: '123 456 789',
        barnsNavn: 'Sedat Kronjuvel',
        barnsFnr: '15084300133',
        barnsAlder: 12,
        høyreSfære: 1.25,
        høyreSylinder: -1.0,
        venstreSfære: 1.0,
        venstreSylinder: -1.0,
        bestillingsdato: '2022-08-02',
        brillepris: 12345.0,
        beløp: 750.0,
        bestillingsreferanse: 'hlkefhuibv',
        satsNr: '3',
        satsBeløp: 750,
        satsBeskrivelse: 'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
        opprettet: '2022-08-07T14:45:00+02:00',
      })
    )
  }),
]
