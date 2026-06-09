const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:5,
        unique:true
    },
    name:{type:String, required:true},
    passwordHash:{
        type:String,
        required:true
    },
    favouriteRecipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]

})

userSchema.set('toJSON', {
        transform:(document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash // do not reveal password hash
        }
    })

const User = mongoose.model('User', userSchema)
module.exports = User