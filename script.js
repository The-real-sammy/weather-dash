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


//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
function fetchWeatherData(cityName) {

  //  Fetch city data using the geo API
  var cityURL = geoApiURL + `q=${cityName}&appid=${apiKey}`;
  fetch(cityURL)
    .then(res => res.json())
    .then(data => {
      //this should handle a successful response by extracting data
      if (data.length > 0) {
        //now check if the city data is found
        var lon = data[0].lon;
        var lat = data[0].lat;

        // now fetch the weather data using the current weather API
        var currentWeatherURL = currentWeatherApiURL + `lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(currentWeatherURL)
          .then(res => res.json())
          .then(weatherData => {
            //this should process and check the current weather data and then display
            console.log("this should be the Current Weather:", weatherData);

    //   * When a user views the current weather conditions for that city they are presented with:
            //this is creating the elements 
            var temperature = document.createElement("h3"); //     * The temperature
            var city = document.createElement("p"); //     * The city name
            var date = document.createElement("p"); //     * The date
            var icon = document.createElement("p"); //     * An icon representation of weather conditions
            var humidity = document.createElement("p"); //     * The humidity
            var wind = document.createElement("p"); //     * The wind speed
// setting the information ?
    var temp = Math.round(weatherData.main.temp - 273.15); // this should convert Kelvin to Celsius
    temperature.textContent = `Temperature: ${temperature}°C`;
    city.textContent = `Name: ${weatherData.name}`;
    wind.textContent = `Wind Speed: ${weatherData.wind[1]}`;
    humidity.textContent = `Name: ${weatherData.main[1]}`;
    date.textContent = `Name: ${weatherData.timezone}`; // this needs to be converted to correct time format

    var weatherInfo = document.getElementById("weather-search")

        // Now append the elements to the weatherInfo container
        weatherInfo.appendChild(temperature);
        weatherInfo.appendChild(city);
        weatherInfo.appendChild(wind);
        weatherInfo.appendChild(humidity);
        weatherInfo.appendChild(date);


          });
      }
    })
    // This should handle any errors
    .catch(error => {
      console.error(error);
      alert("Error: Unable to fetch weather data. Please check your API key or internet connection."); // error message for user 
    })
};

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