const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to mongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app