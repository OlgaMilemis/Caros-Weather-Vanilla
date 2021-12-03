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

function displayTemperature(response) {
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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "5eac19cf21f53d5d30820a9a9bafd9f0";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=${units}`;

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
