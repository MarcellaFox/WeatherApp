function displayWeatherInfo(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "e792da8ba7b0fa0b86908b06e6a23c75";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Brisbane&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayWeatherInfo);
