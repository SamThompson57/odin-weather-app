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
const local = document.getElementById('location')
const temp = document.getElementById('temp')
const desc = document.getElementById('desc')
const feels = document.getElementById('feels')
const humid = document.getElementById('humidity')
const wind = document.getElementById('wind')

let lat = 0
let lon = 0


function containsNumbers(str) {
    if(/\d/.test(str)){
        return `http://api.openweathermap.org/geo/1.0/zip?zip=${city.value},GB&appid=${api}`
    } else {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${city.value.replace(" ", "")}&appid=${api}`
    }
  }

async function getWeather(){

    city.value = city.value.split(' ').join('-')
    //Gets the long and lat data from desired location
    const locResponse = await fetch(containsNumbers(city.value), {mode: 'cors'})
    
    const locData = await locResponse.json();
    console.log(locData)

    if(/\d/.test(city.value)){
        lat = locData.lat
        lon = locData.lon
    } else {
        lat = locData[0].lat
        lon = locData[0].lon
    }
    console.log(`LAT:${lat} LON:${lon}`)
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`, {mode: 'cors'})
    const weatherData = await weatherResponse.json();

    console.log(weatherData)
    local.textContent = `${weatherData.name}, ${weatherData.sys.country}`
    temp.textContent = `${weatherData.main.temp}` //Default is Kelvin
    desc.textContent = `${weatherData.weather[0].description}`
    feels.textContent = `Feels Like: ${weatherData.main.feels_like}`
    humid.textContent = `Humidity: ${weatherData.main.humidity}`
    wind.textContent = `Wind: ${weatherData.wind.speed} M/Sec`
}



getWeather();