// API KEY
var apiKey = '8993ea18706be745ed1d2327a688cc19'

//API URLS
var geoApiURL = 'https://api.openweathermap.org/geo/1.0/direct?';
var currentWeatherApiURL = 'https://api.openweathermap.org/data/2.5/weather?';
var forecastWeatherApiURL = 'https://api.openweathermap.org/data/2.5/forecast?';

//Weather Icon URL
var weatherApiImage = 'https://openweathermap.org/img/wn/';

// * Create a weather dashboard with form inputs - this is a DOM element 

var searchForm = document.getElementById("search-form");// This is the Search form element 
var weatherInfo = document.getElementById("today"); //the weather container 
var searchHistory = document.getElementById("history");
searchHistory.innerHTML = ""; // this is to clear previous history

var forecast= document.getElementById("forecast");
 //this is to show a 5  day forecast 



//   * When a user searches for a city they are presented with current and future conditions for that city
//testing async/await to get data to display on page
async function fetchWeatherData(cityName) {
  try {
    //  Fetch city data using the geo API
    var cityURL = geoApiURL + `q=${cityName}&appid=${apiKey}`;
    var cityData = await fetch(cityURL).then(res => res.json());

    //this should handle a successful response by extracting data
    if (cityData.length > 0) {
      //now check if the city data is found
      var lon = cityData[0].lon;
      var lat = cityData[0].lat;

      var weatherData = await fetchCurrentWeather(lon, lat);
     
      //pass weather data as as a parameter
      displayWeather(weatherData);
    }
  }
  // This should handle any errors
  catch (error) {
    console.error(error);
    alert("Error: Unable to fetch weather data. Please check your API key or internet connection."); // error message for user 
  }
};

async function fetchCurrentWeather(lon,lat) {
 // now fetch the weather data using the current weather API
 var currentWeatherURL = currentWeatherApiURL + `lat=${lat}&lon=${lon}&appid=${apiKey}`;
 var weatherData = await fetch(currentWeatherURL).then(res => res.json()); 
 return weatherData;// Awaiting the response
}
//   * When a user views the current weather conditions for that city they are presented with:
// this should display the weather
function displayWeather(weatherData) {

  console.log("this should be the Current Weather:", weatherData);
  //this is creating the elements 
  var weatherInfo = document.getElementById("today");
  if (!weatherInfo) {
    console.error("Error: Weather information container not found.");
    return;
  }

  var city = document.createElement("h3"); //     * The city name
  var temperature = document.createElement("p"); //     * The temperature
  var date = document.createElement("p"); //     * The date
  var icon = document.createElement("p"); //     * An icon representation of weather conditions
  var humidity = document.createElement("p"); //     * The humidity
  var wind = document.createElement("p"); //     * The wind speed
  // setting the information ?

  city.textContent = `Name: ${weatherData.name}`;
  var temp = Math.round(weatherData.main.temp - 273.15); // this should convert Kelvin to Celsius
  temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
  wind.textContent = `Wind Speed: ${weatherData.wind.speed}m/s`;
  humidity.textContent = `Humidity: ${weatherData.main.humidity}`;
  date.textContent = `Date: ${new Date().toLocaleString()}`; // this needs to be converted to correct time format

  console.log("is this the:", weatherInfo)

  // Now append the elements to the weatherInfo container
  weatherInfo.appendChild(city);
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(wind);
  weatherInfo.appendChild(humidity);
  weatherInfo.appendChild(date);
}


function displayForecast(forecastData) {
  var forecast= document.getElementById("forecast"); //this is to show a 5  day forecast 
  forecast.classList.add("row", "mt-3"); 

  // this should create a Loop through the 5 forecast days
  for (var i = 0; i < 5; i++) {
    var forecastItem = forecastData.list[i * 8]; //forecast updates every 8 hours ?

    // Create elements for each forecast item
    var forecastCol = document.createElement("div"); // Column for 5 day's forecast
    forecastCol.innerHTML = forecastData;
    var date = document.createElement("p");
    var temperature = document.createElement("p");
    var humidity = document.createElement("p");
   
    date.textContent = new Date(forecastItem.dt * 1000).toLocaleDateString();
    temperature.textContent = `Temp: ${Math.round(forecastItem.main.temp - 273.15)}°C`;
    humidity.textContent = `Humidity: ${forecastItem.main.humidity}%`;

    forecastCol.classList.add("col-md-2", "text-center");

    // Append elements to the column
    forecastCol.appendChild(date);
    forecastCol.appendChild(temperature);
    forecastCol.appendChild(humidity);

    // Append the column to the forecast container
    forecast.appendChild(forecastCol);
  }
  weatherInfo.appendChild(forecast);
displayWeather(weatherData);
displayForecast(forecastData);
  // Append the forecast container to the weather information container
}


// add the city is to the search history
function saveSearch(cityName){
  var searchCity =  JSON.parse(localStorage.getItem("citySearched")) || []; // This should either get the existing cities searched or create an empty array
  citySearched.push(cityName.toUpperCase()); // Save city name in uppercase for case-insensitive search
  localStorage.setItem("citySearched", JSON.stringify(citySearched)); // Update localStorage
  loadHistory(); // Update search history display
}

function loadHistory () {
  var citySearched = JSON.parse(localStorage.getItem("citySearched")) || [];
  var searchHistory = document.getElementById("history");
  searchHistory.innerHTML = ""; 

  citySearched.forEach(function(city){
    var li = document.createElement("a");
    li.classList.add("list-group-item", "list-group-item-action")
    li.textContent = citySearched;
    li.addEventListener("click", function(){
      fetchWeatherData(citySearched)
    });
    historyList.appendChild (li)
  })
};


//the function will only be called when the search form is submitted
var searchForm = document.getElementById("search-form");
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); //preventing default form behaviour on submission
  var cityName = document.getElementById("search-input").value;
  if (cityName){
    fetchWeatherData(cityName)
  }
})

