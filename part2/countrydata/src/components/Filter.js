
import React,  { useState } from 'react'



const Filter = ({initialCountries, setCountries}) => {
    console.log(initialCountries)


    const[search, setSearch] = useState([])

    const handleSearch = (event) => {

       const word = event.target.value
       if(word !== '') {
           const result = initialCountries.filter(country => {
              
               return country.name.toLowerCase().includes(event.target.value.toLowerCase())
           })

           console.log(result)
           setCountries(result)
       } else {
           setCountries([])
       }

       setSearch(event.target.value)

    }










return (
    <div>
    find countries
 <input type="search" 
    value={search}
    onChange={handleSearch}
    className="input"
    placeholder="Filter"
    />
    </div>
   
)

}

export default Filter