require('dotenv').config();

const PORT = process.env.PORT
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {PORT, SPOONACULAR_API_KEY, MONGODB_URI}