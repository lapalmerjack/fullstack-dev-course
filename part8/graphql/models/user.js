import mongoose from 'mongoose'


import mongooseUniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true
  },
})
schema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', schema)