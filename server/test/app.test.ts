import { TokenSet } from 'openid-client'
import request from 'supertest'
import { createApp } from '../src/app'

const server = () =>
  request(
    createApp({
      verifyIDPortenToken(req, res, next) {
        next()
      },
      exchangeToken() {
        return Promise.resolve(new TokenSet({}))
      },
    })
  )

describe('app', () => {
  describe('/internal', () => {
    test('/isalive skal svare med 200', async () => {
      const response = await server().get('/internal/isalive')
      expect(response.statusCode).toBe(200)
    })
    test('/isready skal svare med 200', async () => {
      const response = await server().get('/internal/isready')
      expect(response.statusCode).toBe(200)
    })
    test('/metrics skal svare med 200', async () => {
      const response = await server().get('/internal/metrics')
      expect(response.statusCode).toBe(200)
    })
  })
  describe('/', () => {
    test('/settings.js skal svare med 200', async () => {
      const response = await server().get('/settings.js')
      expect(response.statusCode).toBe(200)
    })
  })
})
