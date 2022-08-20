



const Country = ({country, setCountry} )=> {


    return (
        <div>
            {country.name}
            <button onClick={() => setCountry(country)}>show</button>
            
        </div>
    )

}

export default Country