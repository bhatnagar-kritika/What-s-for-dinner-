import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import favouriteService from '../services/favouriteRecipes.js'

const RecipeDetails = ({ user }) => {
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`)
        const data = await response.json()
        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  useEffect(() => {
    if (recipe?.title) {
      document.title = `${recipe.title} - What's for dinner?`
    }
  }, [recipe])

  useEffect(() => {
    const checkFavourite = async () => {
      if (!user) {
        return
      }

      try {
        const favourites = await favouriteService.getFavouriteRecipes()
        const found = favourites.some(
          favourite => favourite.spoonacularId === Number(id)
        )

        setIsFavourite(found)
      } catch (error) {
        console.log('Error checking favourite status:', error)
      }
    }

    checkFavourite()
  }, [id, user])

  const toggleFavourite = async () => {
    if (!user) {
      return
    }

    try {
      if (isFavourite) {
        await favouriteService.removeFromFavourites(recipe.spoonacularId)
        setIsFavourite(false)
      } else {
        await favouriteService.addToFavourites(recipe.spoonacularId)
        setIsFavourite(true)
      }
    } catch (error) {
      console.log('Error updating favourite status:', error)
    }
  }

  if (loading) {
    return <p>Loading the recipe, please hold on...</p>
  }

  if (!recipe) {
    return <p>No recipe found</p>
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
      <h2 className="text-center mb-4 text-2xl font-bold text-gray-600">
        {recipe.title}
      </h2>

      {user ? (
        <button
          onClick={toggleFavourite}
          className="px-4 py-1 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete"
        >
          {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        </button>
      ) : (
        <p className="text-center text-gray-600">
          Log in to add this recipe to favourites.
        </p>
      )}

      <img src={recipe.image} alt={recipe.title} className="rounded-2xl shadow" />

      <p
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(recipe.summary)
        }}
      />

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-600">
          Ingredients:
        </h3>

        <ul className="list-disc list-inside mb-4">
          {recipe.extendedIngredients?.map(ingredient => (
            <li key={ingredient.id} className="text-gray-600">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <h3 className="text-xl text-gray-600 font-semibold mb-2">
          The step by step recipe is as follows:
        </h3>

        {recipe.analysedInstructions?.length > 0 ? (
          recipe.analysedInstructions.map((group, index) => (
            <div key={index} className="mb-4">
              {group.name && <h4 className="font-semibold">{group.name}</h4>}

              <ol>
                {group.steps.map(step => (
                  <li key={step.number} className="text-gray-600">
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
          ))
        ) : (
          <p>No instructions found</p>
        )}
      </div>
    </div>
  )
}

export default RecipeDetails