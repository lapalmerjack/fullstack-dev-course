import axios from "axios"
import { useState, useEffect } from "react"

const Information = ({capital}) => {
    const cityCapital = capital.name ? `Weather in ${capital.name}` : ""
    const temp =  capital.main ? `temperature ${capital.main.temp} Celcius` : ""
    const weatherPicture = capital.weather ? `http://openweathermap.org/img/wn/${capital.weather[0].icon}@2x.png` : "" 
    const wind = capital.wind ? `wind ${capital.wind.speed} m/s` : ""


    return (
       <div>
           <h2>{cityCapital}</h2>
           <p>{temp}</p>
           <img src={weatherPicture} alt="no photo" />
           <p>{wind}</p>
       </div>
    )



}


const Weather = ({city}) => {
  

    const [capital, setCapital] = useState('Loading')
    console.log(capital)

    const api_key = process.env.REACT_APP_API_KEY

 
    const hook = () => {
        console.log("weather effect")

        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(response => {
            console.log(response.data)

            setCapital(response.data)

        })
    }

    useEffect(hook, [])

    return (

       <div>
        <Information capital={capital} />
       </div>
    )

  


}

export default Weather