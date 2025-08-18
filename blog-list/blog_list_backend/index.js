const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info('You can access to Blogs List: http://localhost:3003/api/blogs/')
  logger.info('You can acces to Users List: http://localhost:3003/api/users/')
})
