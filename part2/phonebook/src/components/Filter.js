import React,  { useState } from 'react'

const Filter = (props) => {
    const [search, setSearch] = useState('')
    console.log(props.persons)
   

    const handleSearch = (event) => {
        const word = event.target.value
        if(word !== '') {
          const results = props.persons.filter((person) => {
            return person.name.toLowerCase().includes(event.target.value.toLowerCase())
          });

      
          console.log(results)
          props.setPersons(results)
        } else {
        props.setPersons(props.persons)
        }
  
       setSearch(event.target.value)
        
      }

      

return (
    <div>
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

