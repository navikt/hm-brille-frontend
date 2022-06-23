import express from 'express'
import mustacheExpress from 'mustache-express'
import { setupAuth } from './auth'
import { config } from './config'
import { logger } from './logger'
import { routes } from './routes'

setupAuth()
  .then((auth) => {
    const router = express.Router()
    router.use(auth.verifyIDPortenToken)
    router.use('/api/', routes.api(auth))
    router.use('/internal/', routes.internal())
    router.use('/', routes.public())
    return router
  })
  .then((router) => {
    const server = express()
    server.set('views', config.build_path)
    server.set('view engine', 'mustache')
    server.engine('html', mustacheExpress())
    server.set('trust proxy', 1)
    server.use(config.base_path, router)
    server.listen(config.port, () => logger.info(`Listening on port ${config.port}`))
  })
  .catch((err: unknown) => {
    logger.error(err)
    process.exit(1)
  })
