require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')




const Person = require('./models/person')


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name == 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req[content-length] :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))




app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,

  })

  person.save().then(savedPerson => {
    console.log('person saved')
    response.json(savedPerson)
  })
    .catch(error => next(error))


})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log('persons retrieved')
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {

})

app.get('/api/persons/:id', (request, response) =>  {
  Person.findById(request.params.id).then(person => {
    if(person) { response.json(person)
    } else {
  response.status(404)}
  }).catch(error => next(error))


})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const myconst = 4 == 4 
  Person.findByIdAndUpdate(
    request.params.id, { name, number },{ new: true, runValidators: true, context: 'query' } )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))


})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))


})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
