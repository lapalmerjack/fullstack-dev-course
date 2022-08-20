const bycrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')




userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})


userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })



    if(existingUser) {
        console.log('in here')
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    if(password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bycrypt.hash(password, saltRounds)


    const user = new User({
        username,
        name, 
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})


module.exports = userRouter

