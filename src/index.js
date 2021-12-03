function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#currentCity");
  let temperatureElement = document.querySelector("#actualTemp");
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);

function dayAndNight() {
  let currentDay = new Date();
  let dayNight = currentDay.getHours();
  if (dayNight < 12) {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "purple";
  } else {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "orange";
  }
}
dayAndNight();
