
import OneCountry from "./OneCountry"
import Country from "./Country"
import { useState } from "react"

const ShowCountry = ({country}) => {
    if (country.length < 1) {
        return (
            <>
            </>
        )
    }

    return (
        <OneCountry country={country} />
    )
}

const Countries = ({countries}) => {
  const [country, setCountry] = useState([])
  console.log(country)

 

    if(countries.length === 0) {

        return (
            <div></div>
        )
    }

    if(countries.length === 1) {
        
     
        
        
        return (
            <OneCountry country={countries[0]} />
        )
    }

    if(countries.length > 10) {

        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }


    return (
        <div>
            {countries.map(country => 
            <Country key={country.numericCode} country={country} setCountry={setCountry} />)}
            <ShowCountry country={country} />
            
           
            
        
        </div>
    )
}

export default Countries