
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./models/persons')
const cors = require('cors')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())


morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req[content-length] :body'))

let persons = [
  { 
    'id': 1,
    'name': 'Arto Hellas', 
    'number': '040-123456'
  },
  { 
    'id': 2,
    'name': 'Ada Lovelace', 
    'number': '39-44-5323523'
  },
  { 
    'id': 3,
    'name': 'Dan Abramov', 
    'number': '12-43-234345'
  },
  { 
    'id': 4,
    'name': 'Mary Poppendieck', 
    'number': '39-23-6423122'
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



const information = {
  info: persons.length,
  date: new Date()
}

const generateId = () => {
  const maxID = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxID + 1
}


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(body.name === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const person =  new Person({
    name: body.name,
    number:  body.number,
  })
  console.log(person)

  person.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))

   
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error =>next(error))
})

app.get('/api/info', (request, response) => {

  Person.find({})
    .then((persons) =>{
      response.send(`<p> Phonebook has info for ${persons.length} person <p> <br> ${information.date}`)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body



  Person.findByIdAndUpdate(
    request.params.id, 
    {name, number},
    {new: true, runValidators: true, context: 'query'} )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

    
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).sent({error: 'malformatted id'})
  } else if (error.name ==='ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

