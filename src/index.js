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
const icon = document.getElementById('icon')
const celcius = document.getElementById('celcius')
const statusLine = document.getElementById('statusline')

let lat = 0
let lon = 0

let geoStat = 0
let weatherStat = 0 

function containsNumbers(str) {
    if(/\d/.test(str)){
        return `http://api.openweathermap.org/geo/1.0/zip?zip=${city.value},GB&appid=${api}`
    } else {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${city.value.replace(" ", "")}&appid=${api}`
    }
  }
function kToC (k){
    let ans = k-273.15
    return ans.toFixed(2)
}

function kToF (k) {
    let ans = (k - 273.15) * (9/5) + 32
    return ans.toFixed(2)
}

async function getLocation (){
    try {
        const locResponse = await fetch(containsNumbers(city.value), {mode: 'cors'})
        console.log(`Location Status: ${locResponse.status}`)
        return locResponse.json();
        
    } catch (error) {
        console.log(`Location Status: ${locResponse.status}`)
        console.log(`Error in GetLocation: ${error}`)
    }
}

async function getWeather(){

    statusLine.textContent = 'Loading...'

    city.value = city.value.split(' ').join('-')

    const locData = await getLocation()
    
    
    if (locData.length !== 0 && locData.length !== undefined) {
        if(/\d/.test(city.value)){
            lat = locData.lat
            lon = locData.lon
            } else {
                lat = locData[0].lat
                lon = locData[0].lon
            }
    }   else{
        lat = null
        lon = null
    }
    console.log(locData.length)
    console.log(`LAT:${lat} LON:${lon}`)
    try {    
        
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`, {mode: 'cors'})
        console.log(`Weather Status: ${weatherResponse.status}`)
        weatherStat = weatherResponse.status
        const weatherData = await weatherResponse.json();

        console.log(weatherData)
        local.textContent = `${weatherData.name}, ${weatherData.sys.country}`
        temp.textContent = celcius.checked ? `${kToC(weatherData.main.temp)} C` : `${kToF(weatherData.main.temp)} F` //Default is Kelvin
        desc.textContent = `${weatherData.weather[0].description}`
        feels.textContent = `Feels Like: ${celcius.checked ? `${kToC(weatherData.main.feels_like)} C` : `${kToF(weatherData.main.feels_like)} F`}`
        humid.textContent = `Humidity: ${weatherData.main.humidity}`
        wind.textContent = `Wind: ${weatherData.wind.speed} M/Sec`
        icon.setAttribute('src', `../img/${weatherData.weather[0].icon}.png`)
        
        statusLine.textContent = ''
    } catch (error){
        console.log(`Error in Finding Weather`)
        switch (weatherStat) {
            case 400 :
                statusLine.textContent = `Cannot find weather data for ${city.value}`
                break;
            case 401 : 
                statusLine.textContent = `Cannot get weather data just now. Error: ${weatherStat}`
                break;
            default :
                statusLine.textContent = `There has been an error: ${weatherStat}`
            }
    }

    }




getWeather();