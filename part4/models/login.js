const mongoose = require('mongoose')


const loginSchema = new mongoose.Schema({
    username: String,
    token: String
})


loginSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        
    }
})

const Login = mongoose.model('Login', loginSchema)

module.exports = Login