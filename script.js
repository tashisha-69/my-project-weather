let now = new Date();

let h6 = document.querySelector("h7");

let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
let day = days[now.getDay()];

h6.innerHTML = `${day} ${hours}:${minutes}`;


function getCity(event) {
    event.preventDefault();
    
    let apiKEY = "1bac14ffc7b0daec09f7ccca1d8eaa84";
        
    let city = document.querySelector("#search-input");
    
    let h5 = document.querySelector("h5");
    h5.innerHTML = `${city.value}`;
    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
    
    
    axios.get(`${apiURL}&appid=${apiKEY}`).then(getTemp);
}

let form = document.querySelector("#search-engine");
form.addEventListener( "submit" , getCity);



function getTemp(response) {
    
    let temperature = Math.round(response.data.main.temp);
    let wind = Math.round(response.data.wind.speed);
    let town = response.data.name
    let country = response.data.sys.country
    
    let h5 = document.querySelector("h5");
    h5.innerHTML = town

    let h1 = document.querySelector("h1");
    h1.innerHTML = temperature
    
    let h2 = document.querySelector("h2");
    h2.innerHTML = wind
    
    let h6 = document.querySelector("h6");
    h6.innerHTML = country
    
}




function showTemp(response) {
    
    
    let temperature = Math.round(response.data.main.temp);
    let wind = Math.round(response.data.wind.speed);
    let city = response.data.name
    let country = response.data.sys.country

    let h1 = document.querySelector("h1");
    h1.innerHTML = temperature

    let h2 = document.querySelector("h2");
    h2.innerHTML = wind

    let h5 = document.querySelector("h5");
    h5.innerHTML = city

    let h6 = document.querySelector("h6");
    h6.innerHTML = country
    
}


function currentLocation (position) {
    navigator.geolocation.getCurrentPosition(currentLocation);
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "1bac14ffc7b0daec09f7ccca1d8eaa84";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(showTemp);
}

let button = document.querySelector("#current-button");
button.addEventListener("click" , currentLocation);
