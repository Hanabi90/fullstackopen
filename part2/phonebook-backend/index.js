// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
var morgan = require('morgan')

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use(express.static('build'))
// app.use(unknownEndpoint)

morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

// app.get('/', (request, response) => {
//   response.send('<h1>Hello Wor1ld!</h1>')
// })
app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people<p/>
  <p>${new Date()}<p/>
  `)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function inspectionNameAlreadyExists(name){
  return persons.find((item)=>{
    return item.name === name
  })
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  // response.json(body)
  if (!body.number||!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if(inspectionNameAlreadyExists(body.name)){
    return response.status(400).json({
      error: `${body.name} already exists on the phonebook`
    })
  }
  const person = {
    id: getRandomInt(99999),
    name: body.name,
    number:body.number
  }
  persons = persons.concat(person)
  response.json(person)
})
app.get('/api/persons/', (request, response) => {
  const id = Number(request.params.id)
  const person = persons
  if (person) {
    response.json(person)
  }else{
    response.status(404).end()
  }
  // console.log(person);
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id);
  const person = persons.find(person=>person.id===id)
  if (person) {
    response.json(person)
  }else{
    response.status(404).end()
  }
  // console.log(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})