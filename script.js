let now = new Date();

let h6 = document.querySelector("h7");

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
let day = days[now.getDay()];

h6.innerHTML = `${day} ${hours}:${minutes}`;


function search(city) {
    let apiKEY = "1bac14ffc7b0daec09f7ccca1d8eaa84";
    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiURL}&appid=${apiKEY}`).then(coordinatesCity);
}

function coordinatesCity (city) {
let apiKEY = "1bac14ffc7b0daec09f7ccca1d8eaa84";

let apiURL =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKEY}`;

axios.get(search).then(getTemp);

}

function getCity(event) {
    event.preventDefault();
    
    
    let city = document.querySelector("#search-input");
    
        search(city.value);
    
}


let form = document.querySelector("#search-engine");
form.addEventListener( "submit" , getCity);

search("London");


function getTemp(response) {
    
    
    celsiusTemperature = response.data.main.temp
    let wind = Math.round(response.data.wind.speed);
    let town = response.data.name
    let country = response.data.sys.country
    let description = response.data.weather[0].description
    let humidity = response.data.main.humidity
    let weatherPic = response.data.weather[0].icon

    
    
    let icon = document.querySelector("#icon");
    icon.innerHTML= weatherPic
    
    icon.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    
    
    let h5 = document.querySelector("h5");
    h5.innerHTML = town
    
    let h1 = document.querySelector("h1");
    h1.innerHTML = Math.round(celsiusTemperature);
    
    let h2 = document.querySelector("h2");
    h2.innerHTML = wind
    
    let h6 = document.querySelector("h6");
    h6.innerHTML = country
    
    let span = document.querySelector("#description");
    span.innerHTML = description
    
    let h4 = document.querySelector("h4");
    h4.innerHTML = humidity

    getForecast(coordinates);
}

function getForecast (coordinates) {
    

    let apiKey = "1bac14ffc7b0daec09f7ccca1d8eaa84";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

    axios.get(apiURL).then(displayForecast);
    
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
days.forEach(function(days) {
forecastHTML = forecastHTML +

    `
    
                    <div class="col-2  border border-5 m-3 p-3 rounded-circle">
                        <div class="weather-forecast-day">
                           <strong>
                               ${days}
                           </strong> 
                        </div>
                        <div class="weather-forecast-temp">
                            25° <img src="" alt="" id="icon">
                            <br>
                            <span id="description">
                                blabla

                            </span>
                        </div>
                        
                        

                    </div>

                
                `;
}
)

                forecastHTML= forecastHTML + `</div>`;
                forecastElement.innerHTML=forecastHTML;
                
}


function showTemp(response) {
    
    
    let temperature = Math.round(response.data.main.temp);
    let wind = Math.round(response.data.wind.speed);
    let city = response.data.name
    let country = response.data.sys.country
    let description = response.data.weather[0].description
    let humidity = response.data.main.humidity
    let weatherPic = response.data.weather[0].icon
    
  
    
    let icon = document.querySelector("#icon");
    icon.innerHTML= weatherPic
    
    icon.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    
    let h1 = document.querySelector("h1");
    h1.innerHTML = temperature
    
    let h2 = document.querySelector("h2");
    h2.innerHTML = wind

    let h5 = document.querySelector("h5");
    h5.innerHTML = city
    
    let h6 = document.querySelector("h6");
    h6.innerHTML = country
    
    let span = document.querySelector("#description");
    span.innerHTML = description
    
    let h4 = document.querySelector("h4");
    h4.innerHTML = humidity
    
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

function displayFahrenheitTemp (event) {
    event.preventDefault();
    
    let temperature = document.querySelector("#number-temp");
    let fahrenheitTemp = (celsiusTemperature * 9/5) + 32;
    temperature.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsiusTemp (event) {
    event.preventDefault();
    let temperature = document.querySelector("#number-temp");
    temperature.innerHTML = Math.round(celsiusTemperature);
}



let celsiusTemperature = null;

let button = document.querySelector("#current-button");
button.addEventListener("click" , currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click" , displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
