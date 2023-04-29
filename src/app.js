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

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector(`#description`);
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector(`#date`);
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
