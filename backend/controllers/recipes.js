const recipesRouter = require('express').Router()
const { SPOONACULAR_API_KEY} = require('../utils/config')
//const fetch = require('node-fetch')

recipesRouter.get('/search', async (req, res, next) => {
  try {
    const ingredients= (req.query.ingredients || '').trim()
    if(!ingredients) {
        return res
            .status(400)
            .json({ error: 'Ingredients required, example: ?ingredients=chicken, tomato' })
    }

    const number = (req.query.number || '5').toString()
    const ranking = (req.query.ranking || '2').toString()

    const params = new URLSearchParams({
      ingredients,
      number,
      ranking,
      apiKey: SPOONACULAR_API_KEY
    })

    const url = `https://api.spoonacular.com/recipes/findByIngredients?${params.toString()}`

    const response = await fetch(url)
    
    if(!response.ok) {
        const text = await response.text()
        return res.status(response.status).json({ error: `Spoonacular: ${text}` })
    }

    const data = await response.json()
    const simplified = data.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: recipe.usedIngredientCount,
      missedIngredientCount: recipe.missedIngredientCount,
      
    }))

    res.json({ results: simplified })
  }
  catch (error) {
    next(error)
  }
})

recipesRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
  )

    const data = await response.json()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = recipesRouter