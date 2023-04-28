function displayTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector(`#description`);
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
