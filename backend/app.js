const express = require('express')
const path = require('path')
const middleware = require('./utils/middleware')
const recipesRouter = require('./controllers/recipes')  
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const favouriteRecipesRouter = require('./controllers/favouriteRecipes')
const cors= require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error conneccting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/recipes', recipesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/favourites', favouriteRecipesRouter)

/*2 underscores before dir*/
app.use((request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})


app.use(middleware.errorHandler)

module.exports = app