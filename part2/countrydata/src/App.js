import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {


  const [initialCountries, setInitialCountries] = useState([]) 
  const [countries, setCountries] = useState([])


  const hook = () => {
    console.log('effect')
    axios
       .get('https://restcountries.com/v2/all')
       .then(response => {
         console.log('promise fulfilled')
         setInitialCountries(response.data)

        

       })
  }

  useEffect(hook, [])


  return (

    <div>
      <Filter initialCountries={initialCountries} setCountries={setCountries} />
      <Countries countries={countries} />

    </div>


  )
}

export default App;
