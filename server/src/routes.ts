import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import express, { RequestHandler, Router } from 'express'
import type { Auth } from './auth'
import { config } from './config'
import { logger } from './logger'
import { setupMetrics } from './metrics'
import { proxyHandlers } from './proxy'

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
  api(auth: Auth): Router {
    const router = Router()
    router.use(proxyHandlers.api(auth))
    return router
  },
  public(): Router {
    const router = Router()
    router.get('/settings.js', settingsHandler)
    router.get('*', express.static(config.build_path, { index: false }))
    router.get('*', spaHandler)

    return router
  },
}

const spaHandler: RequestHandler = async (req, res) => {
  try {
    const decorator = await fetchDecoratorHtml({
      env: config.nais_cluster_name === 'prod-gcp' ? 'prod' : 'dev',
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
    GIT_COMMIT: config.git_commit,
    MILJO: config.nais_cluster_name,
    USE_MSW: config.use_msw,
  }
  res.type('.js')
  res.send(`window.appSettings = ${JSON.stringify(appSettings)}`)
}
