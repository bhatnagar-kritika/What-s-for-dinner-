const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    spoonacularId:{
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type:String,
        required:true
    },
    image: String,
    summary: String,
    extendedIngredients: [{
        id: Number,
        original: String
    }],
    analysedInstructions: [{
        name: String,
        steps: [
            {
                number: Number,
                step: String
            }]
    }],

    lastFetched:{
        type: Date,
        default: Date.now,
    }
})

recipeSchema.set('toJSON', {
        transform:(document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe



