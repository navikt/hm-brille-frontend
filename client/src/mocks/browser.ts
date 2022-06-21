import { RequestHandler, rest, setupWorker } from 'msw'

const handlers: RequestHandler[] = [
  rest.get('/api/foobar', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]

export const worker = setupWorker(...handlers)
