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



//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
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

  var temperature = document.createElement("h3"); //     * The temperature
  var city = document.createElement("p"); //     * The city name
  var date = document.createElement("p"); //     * The date
  var icon = document.createElement("p"); //     * An icon representation of weather conditions
  var humidity = document.createElement("p"); //     * The humidity
  var wind = document.createElement("p"); //     * The wind speed
  // setting the information ?

  var temp = Math.round(weatherData.main.temp - 273.15); // this should convert Kelvin to Celsius
  temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
  city.textContent = `Name: ${weatherData.name}`;
  wind.textContent = `Wind Speed: ${weatherData.wind.speed}m/s`;
  humidity.textContent = `Humidity: ${weatherData.main.humidity}`;
  date.textContent = `Date: ${new Date().toLocaleString()}`; // this needs to be converted to correct time format

  console.log("is this the:", weatherInfo)

  // Now append the elements to the weatherInfo container
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(city);
  weatherInfo.appendChild(wind);
  weatherInfo.appendChild(humidity);
  weatherInfo.appendChild(date);
}

//the function will only be called when the search form is submitted
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); //preventing default form behaviour on submission
  var cityName = document.getElementById("search-input").value;
  fetchWeatherData(cityName)
})


//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city