import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import {
    OversiktDetaljerResponse,
    OversiktResponse,
    OversiktResponseItem
} from '../types'

export const handlers: RequestHandler[] = [
  rest.get<{}, {}, OversiktResponse>(apiUrl('/oversikt'), (req, res, ctx) => {
      let page = parseInt(req.url.searchParams.get('page') || '1')
      if (!page || isNaN(page)) page = 1

      let itemsPerPage = 10

      let data = [];
      for (let i = 0; i < 8; i++) data.push([
          {
              vedtakId: 99,
              name: "Sedat Kronjuvel",
              description: "Innsendt: 09. august 2022"
          },
          {
              vedtakId: 100,
              name: "Pippi Langstrømpe",
              description: "Innsendt: 08. august 2022"
          },
          {
              vedtakId: 101,
              name: "Harald Rustibus",
              description: "Innsendt: 07. august 2022"
          }
      ])
      return res(
          ctx.delay(),
          ctx.status(200),
          ctx.json({
              numberOfPages: Math.ceil(data.flat().length/itemsPerPage),
              itemsPerPage: itemsPerPage,
              totalItems: data.flat().length,
              items: data.flat().slice(itemsPerPage*(page-1), itemsPerPage*page)
          })
      )
  }),
  rest.get<{}, {}, OversiktDetaljerResponse>(apiUrl('/oversikt/:vedtakId'), (req, res, ctx) => {
      return res(
          ctx.delay(),
          ctx.status(200),
          ctx.json({
              orgnavn: 'Brillehuset',
              orgnr: '123 456 789',
              barnsNavn: 'Sedat Kronjuvel',
              barnsFnr: '15084300133',
              barnsAlder: '12 år',
              høyreSfære: 1.25,
              høyreSylinder: -1.0,
              venstreSfære: 1.0,
              venstreSylinder: -1.0,
              bestillingsdato: '08.08.2022',
              brillepris: 12345.00,
              belop: 750.00,
              bestillingsreferanse: 'hlkefhuibv',
              satsNr: '3',
              satsBeskrivelse: 'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D.',
          })
      )
  }),
]
