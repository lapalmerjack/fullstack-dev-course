import { useState } from "react"
import personService from '../services/persons'



const PersonForm = ({persons, setPersons, initialPersons, setInitialPersons, setMessage}) => {

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
    const newPerson = {
      name: newName,
      number: newNumber,
      
      
    }

    console.log(newPerson, 'yo yo yo')

    const hasName = persons.find(p => p.name === newPerson.name)

    if (hasName) {
      console.log(newPerson)
      window.confirm(`${newPerson.name} is already added to phonebook, replace the
      old number with a new one?`)

      const changedNumber = {...hasName, number: newPerson.number}
      const id = changedNumber.id
      

      personService
           .update(id, changedNumber)
           .then(returnedNumber => {
             setPersons(persons.map(p => p.id !== id ? p: returnedNumber))
             setInitialPersons(persons.map(p => p.id !== id ? p: returnedNumber))

             setMessage(`${changedNumber.name} number changed to ${changedNumber.number}`)

           setTimeout(() => {
             setMessage(null)
           }, 5000)
           }).catch(error => {
            setMessage(Object.values(error.response.data))

           })
           

           


    } else {
      console.log(newPerson)

      
      personService
         .create(newPerson)
         .then(returnedPerson => {
           setPersons(persons.concat(returnedPerson))
           setInitialPersons(initialPersons.concat(returnedPerson))
           setNewName('')
           setNewNumber('')


           setMessage(`Added ${newPerson.name}`)

           setTimeout(() => {
             setMessage(null)
           }, 5000)
         })
         .catch(error => {
           console.log(error.response.data)
           setMessage(Object.values(error.response.data))
         
         })

       


    
    }

}


    return (

        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )


   


}

export default PersonForm



