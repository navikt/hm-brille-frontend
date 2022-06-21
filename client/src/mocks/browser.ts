import { RequestHandler, rest, setupWorker } from 'msw'
import { HentPersonRequest, Person } from '../types'

const handlers: RequestHandler[] = [
  rest.post<HentPersonRequest, {}, Person>('/api/hent-person', (req, res, ctx) => {
    const { fnr } = req.body
    if (fnr === '404') {
      return res(ctx.status(404))
    }
    return res(
      ctx.status(200),
      ctx.json({
        fnr,
        fornavn: 'SEDAT',
        etternavn: 'KRONJUVEL',
      })
    )
  }),
]

export const worker = setupWorker(...handlers)
