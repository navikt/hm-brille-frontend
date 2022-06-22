import express, { RequestHandler } from 'express'
import mustacheExpress from 'mustache-express'
import { auth } from './auth'
import { config } from './config'
import { logger } from './logger'
import { routes } from './routes'

const server = express()
server.set('views', config.buildPath)
server.set('view engine', 'mustache')
server.engine('html', mustacheExpress())
server.set('trust proxy', 1)

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { verifyToken } = await auth()
  const valid = await verifyToken(req.bearerToken)
  if (valid || config.cluster === 'labs-gcp') {
    next()
  } else {
    res.sendStatus(401)
  }
}

const router = express.Router()
router.use((req, res, next) => {
  req.bearerToken = req.headers['authorization']?.split(' ')[1]
  next()
})
router.use('/api/', authMiddleware, routes.api())
router.use('/', authMiddleware, routes.internal())
router.use('/', authMiddleware, routes.public())

server.use(config.basePath, router)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
