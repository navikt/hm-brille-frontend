import express from 'express'
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

const router = express.Router()
router.use((req, res, next) => {
  req.bearerToken = () => req.headers['authorization']?.split(' ')[1]
  next()
})
router.use(async (req, res, next) => {
  if (config.cluster === 'labs-gcp' || req.path.startsWith('/internal/')) {
    next()
    return
  }
  const { verifyToken } = await auth()
  if (await verifyToken(req.bearerToken())) {
    next()
  } else {
    res.sendStatus(401)
  }
})
router.use('/api/', routes.api())
router.use('/internal/', routes.internal())
router.use('/', routes.public())

server.use(config.basePath, router)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
