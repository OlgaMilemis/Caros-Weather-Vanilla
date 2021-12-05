let currentTime = new Date();
function formatDate(date) {
  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#currentCity");
  let dateDisplay = document.querySelector("#date");
  let temperatureElement = document.querySelector("#actualTemp");
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  dateDisplay.innerHTML = formatDate(currentTime);
  celsiusTemp = response.data.main.temp;
  minCelsius = response.data.main.temp_min;
  maxCelsius = response.data.main.temp_max;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  minTempElement.innerHTML = Math.round(minCelsius);
  maxTempElement.innerHTML = Math.round(maxCelsius);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actualTemp");
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let minFahrenheit = (minCelsius * 9) / 5 + 32;
  let maxFahrenheit = (maxCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  minTempElement.innerHTML = Math.round(minFahrenheit);
  maxTempElement.innerHTML = Math.round(maxFahrenheit);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actualTemp");
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  minTempElement.innerHTML = Math.round(minCelsius);
  maxTempElement.innerHTML = Math.round(maxCelsius);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function showPosition(position) {
  let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let dateDisplay = document.querySelector("#date");
dateDisplay.innerHTML = formatDate(currentTime);

let celsiusTemp = null;
let minCelsius = null;
let maxCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

let buttonCurrentCoords = document.querySelector("#current-location-button");
buttonCurrentCoords.addEventListener("click", getCurrentCoords);

let fahrenheitLink = document.querySelector("#linkF");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#linkC");
celsiusLink.addEventListener("click", showCelsius);

search("Moscow");
