import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/favourites'

const baseUrl = '/api/favourites'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getConfig = () => {
    if(!token) {
        return{}
    }
    return {
        headers: { Authorization: token }
    }
}

const addToFavourites = async (recipeId) => {

    const response = await axios.post(`${baseUrl}/${recipeId}`, {}, getConfig())

    return response.data
}

const removeFromFavourites = async (recipeId) => {
    const response = await axios.delete(`${baseUrl}/${recipeId}`, getConfig())
    return response.data
}

const getFavouriteRecipes = async () => {
    const response = await axios.get(baseUrl, getConfig())
    return response.data
}

export default { 
    setToken,   
    addToFavourites, 
    removeFromFavourites, 
    getFavouriteRecipes }