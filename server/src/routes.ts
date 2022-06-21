import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import express, { RequestHandler, Router } from 'express'
import { config } from './config'
import { logger } from './logger'
import { setupMetrics } from './metrics'

export const routes = {
  internal(): Router {
    const router = Router()
    router.get('/isalive', (_, res) => res.send('alive'))
    router.get('/isready', (_, res) => res.send('ready'))

    const prometheus = setupMetrics()
    router.get('/metrics', async (req, res) => {
      res.set('Content-Type', prometheus.contentType)
      res.end(await prometheus.metrics())
    })

    return router
  },
  public(): Router {
    const router = Router()
    router.get('/settings.js', settingsHandler)
    router.get('*', express.static(config.buildPath(), { index: false }))
    router.get('*', spaHandler)

    return router
  },
}

const spaHandler: RequestHandler = async (req, res) => {
  try {
    const decorator = await fetchDecoratorHtml({
      env: config.isProduction() ? 'prod' : 'dev',
      context: 'samarbeidspartner',
      chatbot: false,
    })
    res.render('index.html', decorator)
  } catch (err: unknown) {
    const error = `Feil under henting av dekoratør: ${err}`
    logger.error(error)
    res.status(500).send(error)
  }
}

const settingsHandler: RequestHandler = (req, res) => {
  const appSettings = {
    GIT_COMMIT: process.env.GIT_COMMIT,
    MILJO: process.env.NAIS_CLUSTER_NAME,
    USE_MSW: process.env.USE_MSW === 'true',
  }
  res.type('.js')
  res.send(`window.appSettings = ${JSON.stringify(appSettings)}`)
}
