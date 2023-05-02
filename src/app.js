function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayWeatherForecast(response) {
  let forecast = response.data.daily;

  let weatherForecastElement = document.querySelector(`#weather-forecast`);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
      alt=""
      width="42"
    />
    <div class="weather-forecast-temp">
      <span class="weather-forecast-temp-min">${Math.round(
        forecastDay.temperature.minimum
      )}° </span
      ><span class="weather-forecast-temp-max">${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "babc1213f11b9atf604b57efa38oa64c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayTemp(response) {
  console.log(response);
  let cityElement = document.querySelector(`#city`);
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector(`#temp-number`);
  celsiusTemp = response.data.temperature.current;
  let temperature = Math.round(celsiusTemp);
  temperatureElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector(`#description`);
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector(`#humidity`);
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windSpeedElement = document.querySelector(`#wind-speed`);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector(`#date`);
  date.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector(`#icon`);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "babc1213f11b9atf604b57efa38oa64c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}
let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(`#city-input`);
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("London");
