const recipesRouter = require('express').Router()
const { SPOONACULAR_API_KEY} = require('../utils/config')
const Recipe = require('../models/Recipes')

//search spoonacular for a recipe by ingredients
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

    console.log({ingredients, number, ranking})

    const params = new URLSearchParams({
      ingredients,
      number,
      ranking,
      ignorePantry: 'true',
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

    const existing = await Recipe.findOne({spoonacularId: id})
    if(existing) {
      return res.json(existing)
    }

    const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
  )

    if(!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({error:text})
    }

    const data = await response.json()

    console.log('Spoonacular response:') 
    console.log('instructions:', data.instructions)
    console.log('analyzedInstructions:', data.analyzedInstructions)
    console.log('===========================')  

    /*Spoonacular used z in analyzedInstructions hence the name and i have used s in analysedInstructions*/ 
    const recipe = new Recipe({
      spoonacularId:data.id,
      title:data.title,
      image:data.image,
      summary:data.summary,
      extendedIngredients: data.extendedIngredients?.map(ingredient=> ({
        id: ingredient.id,
        original: ingredient.original
      })),
      analysedInstructions: data.analyzedInstructions?.map(instruction=> ({
        name:instruction.name,
        steps:instruction.steps.map(step=> ({
          number: step.number,
          step: step.step
        }))
      }))

    })

    const saved = await recipe.save()
    res.json(saved)
  } catch (error) {
    next(error)
  }
})

module.exports = recipesRouter