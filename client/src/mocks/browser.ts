import { RequestHandler, rest, setupWorker } from 'msw'
import { SjekkKanSøkeRequest, SjekkKanSøkeResponse } from '../types'

const handlers: RequestHandler[] = [
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
