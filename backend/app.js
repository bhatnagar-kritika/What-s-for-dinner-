const express = require('express')
const middleware = require('./utils/middleware')
const recipesRouter = require('./controllers/recipes')  
const cors= require('cors')
//const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error conneccting to MongoDB:', error.message)
//   })

//app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/recipes', recipesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app