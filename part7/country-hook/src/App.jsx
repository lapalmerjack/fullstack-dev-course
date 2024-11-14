import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      console.log('fetching countries')
      axios
       .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
       .then(response => {
         console.log(response.data)
         
         const country = {
          name: response.data.name.common,
          population: response.data.population,
          flag: response.data.flags.svg,
          found: true
         }
         setCountry(country)
        
   
       }).catch((error) => {
        console.error('Error fetching country data', error)
        const country = {
          found: false
        }
        setCountry(country)
       })
    }

  }, [name])

  return country
}

const Country = ({ country }) => {

  if (!country) {
    return null
  }

  if (!country.found) {

    console.log("In here: ${country.found")
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)



  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App