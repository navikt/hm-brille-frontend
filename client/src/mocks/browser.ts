import { rest, setupWorker } from 'msw'

export const worker = setupWorker(
  rest.get('/api/foobar', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)
