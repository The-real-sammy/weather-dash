// API KEY
var apiKey = '8993ea18706be745ed1d2327a688cc19'

//API URLS
var geoApiURL = 'https://api.openweathermap.org/geo/1.0/direct?';
var currentWeatherApiURL = 'https://api.openweathermap.org/data/2.5/weather?';
var forecastWeatherApiURL = 'https://api.openweathermap.org/data/2.5/forecast?';

//Weather Icon URL
var weatherApiImage = 'https://openweathermap.org/img/wn/';

// * Create a weather dashboard with form inputs.

var searchForm = document.getElementById("search-form");// This is the Search form element 


//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
function fetchWeatherData(cityName) {
  // Fetch data from API
  // Handle response and errors

  var cityURL =
  geoApiURL +
  currentWeatherApiURL +
    "&appid=8993ea18706be745ed1d2327a688cc19";

  fetch(cityURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(cityURL);
      console.log(data);

      var lon = data[0].lon;
      var lat = data[0].lat;

      var longLatURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +

        "&appid=ef4ac2c82d48b8c9e99b208c1d96371c";
      fetch(longLatURL)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(longLatURL);
          console.log(data);
        })
        .catch(error => { // Handle any errors

          console.error(error);
})
};

//   * When a user views the current weather conditions for that city they are presented with:
//     * The city name
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//     * The wind speed

//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city