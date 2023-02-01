/*
EXAMPLES OF API CALLS:

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

So We will alow the user to enter either Long/Lat. or by location
*/
const city = document.getElementById('city')
const country = document.getElementById('country')

async function getWeather(){
    
    //Gets the long and lat data from desired location
    const locResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value},${country}&appid=6379216afd993b8afe985aa9b184d4a1`, {mode: 'cors'}) 
    const locData = await locResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locData[0].lat}&lon=${locData[0].lon}&appid=6379216afd993b8afe985aa9b184d4a1`, {mode: 'cors'})
    const weatherData = await weatherResponse.json();

    console.log(weatherData)

    
}