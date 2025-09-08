import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Home = () => {

  const [ingredients, setIngredients] = useState("")
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    document.title= "What's for dinner?"
  },[])

  const getRecipes = async () => {
    try {
      if(!ingredients) return;
      setLoading(true)
      const encodedIngredients = encodeURIComponent(ingredients);
      const url = `http://localhost:3001/api/recipes/search?ingredients=${encodedIngredients}&number=5&ranking=2`
      const res= await fetch(url)
      const data = await res.json()
      setRecipes(data.results)
      console.log(data)      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if(loading) return <p>Loading recipes, please hold on...</p>
  if(!recipes) return <p>No recipes found, try different ingredients.</p>

  return(
    <div className="container mx-auto p-4" >
      <br></br>
      <h2 className="text-2xl text-center mb-6 ">
        Add your ingredients below, separated by a comma
      </h2>

      <div className="flex flex-col items-center gap-4 mb-6 ">
        <input 
          type="text" 
          placeholder="e.g. tomatoes, spinach"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border-2 border-slate-200 rounded-md px-2 py-4 w-full sm:w-1/2 md:w-1/3 text-center"
        /> {/*th input text box has full width on mobile, 50% width on small screens and 33% width on medium screens and above */}
      
      <button onClick={getRecipes} className="px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
        Get recipes
      </button>
      </div>
      
      <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
        {recipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 rounded-md shadow border-slate-200 w-full text-center"> 
          <h2 className="text-lg font-semibold text-center mb-2">{recipe.title}</h2>
          <Link to={`/recipe/${recipe.id}`} target="_blank">
            <img src={recipe.image} alt={recipe.title} className="rounded-md shadow mx-auto mb-4"/>
          </Link>

          
          
        <Link to={`/recipe/${recipe.id}`} target="_blank" className="px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
            View recipe
        </Link>

          {/* <button 
            onClick={() => setSelectedRecipe(recipe.id)} 
            className="px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
            View Recipe
          </button> */}
        </div>
      ))}
      </div>
      

      {error && <p style={{ color: "red" }}>Error: {error} </p>}
      {/* {selectedRecipe && <RecipeDetails recipeId={selectedRecipe} />} */}

    </div>
  )
}

export default Home