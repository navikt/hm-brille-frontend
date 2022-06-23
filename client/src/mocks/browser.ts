import { RequestHandler, rest, setupWorker } from 'msw'
import { HentPersonRequest, Person } from '../types'

const handlers: RequestHandler[] = [
  rest.post<HentPersonRequest, {}, Person>('/api/sjekk-kan-soke', (req, res, ctx) => {
    const { fnr } = req.body
    if (fnr === '404') {
      return res(ctx.status(404))
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
