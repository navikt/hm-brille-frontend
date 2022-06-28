import { RequestHandler, rest, setupWorker } from 'msw'
import { SjekkKanSøkeRequest, SjekkKanSøkeResponse, BeregnSatsRequest, BeregnSatsResponse } from '../types'

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>('/api/beregn-sats', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sats: '3',
        satsBeskrivelse: 'Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D',
        beløp: '2375',
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
]

export const worker = setupWorker(...handlers)
