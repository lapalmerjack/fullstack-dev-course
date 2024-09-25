/* eslint-disable react/prop-types */
import { useState } from "react"
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, filteredPersons,
   setFilteredPersons, setMessage}) => {

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  
  }
const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

  const addPerson = (event) => {
    event.preventDefault()
  

    const newPerson = persons.find(person => newName === person.name)
  
    if(newPerson) {
     updatePhoneNumber(newPerson)
    } else {

    const personObject = {
      name: newName,
      number: newNumber,
      
    }
    console.log(personObject, 'my friend')

    personService
    .create(personObject)
    .then(returnedPerson => {
      console.log(returnedPerson, 'person is returned')
      setPersons(persons.concat(returnedPerson))
      setFilteredPersons(filteredPersons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

      setMessage(`Added ${returnedPerson.name}`)

     setTimeout(() => {
      setMessage(null)
     }, 5000)
      
      
    }).catch(error => {
      // Handle the error here
      console.log(error.response.data.error)

      setMessage(error.response.data.error)

      setTimeout(() => {
       setMessage(null)
      }, 5000)
    });

 
  }
    }

    const updatePhoneNumber = (updatedPerson) => {   
      
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)

     if(confirmation) {
      const id = updatedPerson.id
      const newPerson = {...updatedPerson, number: newNumber}
      console.log('my new person', newPerson)
        personService
        .update(id, newPerson)
        .then(updatedPerson => {
          console.log(id, ' is the id')
          setFilteredPersons(prevPersons => prevPersons.map(person => person.id !== id ? person : updatedPerson));
          setPersons(prevPersons => prevPersons.map(person => person.id !== id ? person : updatedPerson));
          setNewName('')
          setNewNumber('')
    
        })

     } else {
          setNewName('')
          setNewNumber('')
     }
   
     
  
    }
  
    return (
      <form onSubmit={addPerson}>
      <div>
        name: <input value={newName}
        onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber}
        onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  

    
   
}

export default PersonForm