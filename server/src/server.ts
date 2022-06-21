import express from 'express'
import mustacheExpress from 'mustache-express'
import { config } from './config'
import { logger } from './logger'
import { routes } from './routes'

const server = express()
server.set('views', config.buildPath())
server.set('view engine', 'mustache')
server.engine('html', mustacheExpress())
server.set('trust proxy', 1)

const router = express.Router()
router.use('/', routes.internal())
router.use('/', routes.public())

server.use(config.basePath(), router)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
