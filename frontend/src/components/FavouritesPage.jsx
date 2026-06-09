import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import favouriteService from "../services/favouriteRecipes";

const FavouritesPage = ({user}) => {
    const [favourites, setFavourites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = "Favourites - What's for dinner?"
    }, [])

    useEffect(() => {
        const fetchFavourites = async () => {
            if(!user) {
                setLoading(false)
                return
            }

            try {
                const favouriteRecipes = await favouriteService.getFavouriteRecipes()
                setFavourites(favouriteRecipes)
            } catch (error) {
                console.error("Error fetching favorite recipes:", error)
            }  finally {
                setLoading(false)
            }   
        }
        fetchFavourites()
    }, [user])

    if(!user){
        return (
            <p className = "text-center mt-8 text-gray-600">
                Please log in to see your favourite recipes.
            </p>
        )
    }

    if(loading){
        return (
            <p className = "text-center mt-8 text-gray-600">
                Loading your favourite recipes...
            </p>
        )
    }

    return (
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto px-4 mt-8">
            <h2 className="text-2xl font-bold text-gray-600">
                Your Favourite Recipes
            </h2>

            {favourites.length === 0 ? (
                <p>
                    You have not added any recipes to your favourites yet.
                </p>
            ):(
                favourites.map(recipe => (
                    <div
                        key={recipe.id}
                        className="border p-4 rounded-md shadow border-slate-200 w-full text-center"
                    > 
                        <h3 className="text-lg font-semibold text-center mb-2">
                            {recipe.title}
                        </h3>

                        <Link to={`/recipe/${recipe.spoonacularId}`}>
                            <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="rounded-md shadow mx-auto mb-4"
                            />
                        </Link>

                        <Link
                            to={`/recipe/${recipe.spoonacularId}`}
                            className="px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete"
                        >
                            View recipe
                        </Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default FavouritesPage