import Weather from "./Weather"


const OneCountry = ({country}) => {








  

    const languages = country.languages

    


    return (

        
        <div>
            <h1>{country.name}</h1>

            capital {country.capital}
            <br></br>
            area  {country.area}
            <h2>languages:</h2>
            <ul>
            {languages.map((language) => 
            <li key={languages.indexOf(language)}>
                {language.name}
            </li>)}
            </ul>

            <img src= {country.flags.png} alt="flag" width="150" height="100" />

           

            <Weather city={country.capital} />


        </div>
    )
}

export default OneCountry