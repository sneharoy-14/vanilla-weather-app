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
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector(`#description`);
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector(`#date`);
  date.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "babc1213f11b9atf604b57efa38oa64c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
