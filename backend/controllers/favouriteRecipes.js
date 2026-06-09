const favouriteRecipesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Recipe = require('../models/Recipes')

const getUserFromToken = async (request) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return null
  }

  return await User.findById(decodedToken.id)
}

favouriteRecipesRouter.post('/:recipeId', async (request, response, next) => {
  try {
    const user = await getUserFromToken(request)

    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }

    // CHANGED: frontend sends spoonacularId, not MongoDB _id
    const recipe = await Recipe.findOne({
      spoonacularId: Number(request.params.recipeId)
    })

    if (!recipe) {
      return response.status(404).json({
        error: 'Recipe not found. Open the recipe details page first so it is saved to MongoDB.'
      })
    }

    const alreadyFavourite = user.favouriteRecipes.some(
      favourite => favourite.toString() === recipe._id.toString()
    )

    if (alreadyFavourite) {
      return response.status(400).json({
        error: 'Recipe already in favourites'
      })
    }

    user.favouriteRecipes = user.favouriteRecipes.concat(recipe._id)

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

favouriteRecipesRouter.delete('/:recipeId', async (request, response, next) => {
  try {
    const user = await getUserFromToken(request)

    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }

    // CHANGED: find recipe using spoonacularId first
    const recipe = await Recipe.findOne({
      spoonacularId: Number(request.params.recipeId)
    })

    if (!recipe) {
      return response.status(404).json({
        error: 'Recipe not found'
      })
    }

    user.favouriteRecipes = user.favouriteRecipes.filter(
      favourite => favourite.toString() !== recipe._id.toString()
    )

    await user.save()

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

favouriteRecipesRouter.get('/', async (request, response, next) => {
  try {
    const user = await getUserFromToken(request)

    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const populatedUser = await User
      .findById(user._id)
      .populate('favouriteRecipes')

    response.status(200).json(populatedUser.favouriteRecipes)
  } catch (error) {
    next(error)
  }
})

module.exports = favouriteRecipesRouter