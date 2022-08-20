import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  
  const [initialPersons, setInitialPersons] = useState([])
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  const hook = () => {
    console.log("retrieving")
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setInitialPersons(initialPersons)
      })

   
  }

  useEffect(hook, [])

  const deletePerson = id => {

    const person = persons.find(p => p.id === id)
    const deletedPerson = {...person}

    

    if(window.confirm(`Delete ${person.name}?`)) {
      personService 
      .remove(id, deletedPerson)
      .then(deleted => {

      setPersons(persons.filter(p => p.id !== id))
      setInitialPersons(persons.filter(p => p.id !== id ))

      })
      .catch(error => {
        setMessage(
          `Information of ${person.name} has already been removed from server`
        )}
      )


      
     
      
      
}

    }


    


  
 


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter persons={initialPersons} setPersons={setPersons} />
      <h2>add a new</h2>
     <PersonForm persons={persons} setPersons={setPersons} setInitialPersons={setInitialPersons}
     initialPersons={initialPersons} setMessage={setMessage} />
      <h3>Numbers</h3>
      {persons.map((person) => 
        <Person key={person.id} person={person} 
        deletePerson={() => deletePerson(person.id)} />
        )}
    </div>
  )
}

export default App