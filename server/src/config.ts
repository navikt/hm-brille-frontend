import path from 'path'

export const config = {
  basePath() {
    return '/'
  },
  buildPath() {
    return path.join(__dirname, '../../client/dist')
  },
  isProduction() {
    return process.env.NODE_ENV === 'production'
  },
}
