/* eslint-disable react/prop-types */
import { useState } from 'react'
import Person from './components/person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'



const PersonsList = ({persons, deletePerson}) => {
  console.log('persons:', persons)
  if (persons.length <= 0) {
    return '....'
  }

  return (
   <div>
    {persons.map(person => <Person key={person.id}
     name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)} />)}
   </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons])
  const [message, setMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService.getAll()
    .then(initialPersons => {
      console.log('promise fufilled data: ', initialPersons)
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
      console.log(persons, 'persons here')
    })
  }
  useEffect(hook, [])

  const deletePerson = id => {
    console.log(id)
   
    const person = filteredPersons.find(p => p.id === id)
    console.log(person, ' will be deleted')

    if(confirm(`Are you sure you would like to delete ${person.name}`)) {
      personService.remove(person.id)
      .then(response => {
        console.log(`${response} was deleted from server`)

        setPersons(persons.filter(p => p.id !== id));
        setFilteredPersons(filteredPersons.filter(p => p.id !== id));
      // eslint-disable-next-line no-unused-vars
      }) .catch(error => {
        setMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        setFilteredPersons(filteredPersons.filter(p => p.id !== id));

       })

    }
  
  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <h2>Add a new</h2>
     <PersonForm persons={persons} setPersons={setPersons} filteredPersons={filteredPersons}
     setFilteredPersons={setFilteredPersons} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
