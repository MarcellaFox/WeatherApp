//search engine

const cityHeader = document.querySelector("#city-header");
const apiKey = "e792da8ba7b0fa0b86908b06e6a23c75";
function updateTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  console.log(response.data);
}

function updateWeatherDescription(response) {
  let weatherDescription = response.data.weather[0].description;
  let todayDescription = document.querySelector("#today-description");
  todayDescription.innerHTML = weatherDescription;
}

function updateWeatherInfo(event) {
  event.preventDefault();

  let citySearchInput = document.querySelector("#search-city-input");
  cityHeader.innerHTML = citySearchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(function (response) {
    updateTemp(response);
    updateWeatherDescription(response);
  });
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateWeatherInfo);

//current location

function setCurrentLocationEventHandler(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function findLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiPositionUrl).then(function (response) {
      updateTemp(response);
      updateWeatherDescription(response);
      let cityHeader = document.querySelector("#city-header");
      cityHeader.innerHTML = response.data.name;
    });
  });
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", setCurrentLocationEventHandler);

// current date and time

let now = new Date();

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
}

let todayDetails = document.querySelector("#today-date-time");
todayDetails.innerHTML = formatDate(now);
