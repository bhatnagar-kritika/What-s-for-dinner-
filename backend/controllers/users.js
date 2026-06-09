const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async(req, res, next) => {
    const {username, name, password} = req.body

    if(!username || !password) {
        return res.status(400).json({error: "Username and password required"})
    }

    if(username.length <5){
        return res.status(400).json({
            error: "Username must be atleast 5 characters long"
        })
    }

    if(password.length<8) {
        return res.status(400).json({
            error: "Password must be atleast 8 characters long"
        })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter