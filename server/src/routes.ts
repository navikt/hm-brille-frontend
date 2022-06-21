import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import express, { Express, RequestHandler, Router } from 'express'
import { config } from './config'

export const routes = {
  public(server: Express): Router {
    const router = Router()
    router.get('/settings.js', settingsHandler)
    router.get('*', express.static(config.buildPath(), { index: false }))
    server.get('/', spaHandler)
    router.get('*', spaHandler)
    return router
  },
}

const spaHandler: RequestHandler = async (req, res) => {
  try {
    const decorator = await fetchDecoratorHtml({
      env: config.isProduction() ? 'prod' : 'dev',
      context: 'samarbeidspartner',
    })
    res.render('index.html', decorator)
  } catch (err: unknown) {
    const error = `Feil under henting av dekoratør: ${err}`
    console.error(error)
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
