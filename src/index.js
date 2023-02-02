/*
EXAMPLES OF API CALLS:

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

So We will alow the user to enter either Long/Lat. or by location
*/

import { api } from "./api"

const submit = document.getElementById('submit')

submit.onclick = () => getWeather()

const city = document.getElementById('city')

async function getWeather(){
    
    //Gets the long and lat data from desired location
    const locResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${api}`, {mode: 'cors'}) 
    const locData = await locResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locData[0].lat}&lon=${locData[0].lon}&appid=${api}`, {mode: 'cors'})
    const weatherData = await weatherResponse.json();

    console.log(weatherData)

    
}

getWeather();