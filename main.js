const API_KEY = "c5d5f8fb8e332fcd206d55fe0e91d988";

const elWeatherList = document.querySelector(".weather-list");
const elWeatherInfoList = document.querySelector(".weather-info-list");
const elTemplate = document.querySelector(".weather-template").content;
const elWeatherForm = document.querySelector(".weather-form");
const elWeatherInput = elWeatherForm.querySelector(".input-search");
// https://api.openweathermap.org/data/2.5/weather?units=metric&q=Tashkent&appid={API key}

const countryName = ["Tashkent", "London", "Moscow", "Berlin"]

function renderWeather(res, node) {

  const cloneTemplate = elTemplate.cloneNode(true);
  const weatherItem = cloneTemplate.querySelector(".weather-item");
  const weatherTemp = cloneTemplate.querySelector(".weather-temp");
  const weatherCountry = cloneTemplate.querySelector(".country-name");
  const weatherIcon = cloneTemplate.querySelector(".weather-icon");
  const sysCountry = cloneTemplate.querySelector(".sys-country");
  const today = cloneTemplate.querySelector(".date");
  const countryFlag = cloneTemplate.querySelector(".country-flag");

  let seconds = res.data.dt;

  let date = new Date(seconds * 1000);
  let days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  let weekDay = days[date.getDay()];

  today.textContent = weekDay;
  sysCountry.textContent = res.data.sys.country;
  weatherTemp.dataset.weatherId = res.data.weather[0].id;
  const id = res.data.weather[0].id;
  weatherTemp.textContent = res.data.main.temp + ' °C';
  weatherCountry.textContent = res.data.name;

  if (sysCountry.textContent == 'UZ'){
    countryFlag.src = "./images/uzbekistan.png";
  }
  else if (sysCountry.textContent == 'DE'){
    countryFlag.src = "./images/germany.png";
  }
  else if (sysCountry.textContent == 'RU'){
    countryFlag.src = "./images/russia.png";
  }
  else if (sysCountry.textContent == 'GB'){
    countryFlag.src = "./images/united-kingdom.png";
  }

  if(id >= 200 && id <= 232) {
    weatherIcon.src = "./images/lightning.png";
    weatherItem.classList.add("lightning-weather");
  }
  else if (id >= 300 && id <= 531) {
    weatherIcon.src = "./images/raining.png";
    weatherItem.classList.add("rainy-weather");
  }
  else if (id >= 600 && id <= 622) {
    weatherIcon.src = "./images/snowy.png";
    weatherItem.classList.add("snowy-weather");
  }
  else if (id >= 701 && id <= 781) {
    weatherIcon.src = "./images/mist.png";
    weatherItem.classList.add("foggy-weather");
  }
  else if (id == 800) {
    weatherIcon.src = "./images/sun.png";
    weatherItem.classList.add("sunny-weather");
  }
  else if (id >= 801 && id <= 804) {
    weatherIcon.src = "./images/clouds.png";
    weatherItem.classList.add("cloudy-weather");
  }

  node.appendChild(cloneTemplate);

}

for (const item of countryName) {
  const weatherGetData = async (item, key) => {
    try {
      const req = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${item}&appid=${key}`);

      renderWeather(req, elWeatherList);
      console.log(req);
    } catch (error) {
      console.log(error);

    }
  };
  weatherGetData(item, API_KEY);
}

function renderMoreWeatherInfo (response, node) {
  node.innerHtml = '';
  const getDate = document.querySelector(".get-date");
  const weatherImage = document.querySelector(".weather-image");
  const tempDegree = document.querySelector(".degree");
  const countryFullName = document.querySelector(".country-full-name");
  const tempValue = document.querySelector(".country-temp");
  const countryHumidity = document.querySelector(".country-humidity");
  const windSpeed = document.querySelector(".country-wind-speed");
  const weatherInfo = document.querySelector(".info-weather");
  const countryLocation = document.querySelector(".country-location");

  let seconds = response.data.dt;

  let date = new Date(seconds * 1000);
  let days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  let weekDay = days[date.getDay()];

  getDate.textContent = weekDay;
  tempDegree.textContent = response.data.main.temp + ' °C';
  weatherInfo.textContent = response.data.weather[0].main;
  tempValue.textContent = response.data.main.temp + ' °C';
  countryFullName.textContent = response.data.name;
  countryHumidity.textContent = response.data.main.humidity + ' %';
  windSpeed.textContent = response.data.wind.speed + ' km/h';
  const weather_id = response.data.weather[0].id;
  countryLocation.textContent = response.data.sys.country;

  if(weather_id >= 200 && weather_id <= 232) {
    weatherImage.src = "./images/lightning.png";
  }
  else if (weather_id >= 300 && weather_id <= 531) {
    weatherImage.src = "./images/raining.png";
  }
  else if (weather_id >= 600 && weather_id <= 622) {
    weatherImage.src = "./images/snowy.png";
  }
  else if (weather_id >= 701 && weather_id <= 781) {
    weatherImage.src = "./images/mist.png";
  }
  else if (weather_id == 800) {
    weatherImage.src = "./images/sun.png";
  }
  else if (weather_id >= 801 && weather_id <= 804) {
    weatherImage.src = "./images/clouds.png";
  }

}

async function weather(api_key) {
  const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=Andijon&appid=${api_key}`);

  renderMoreWeatherInfo(request, elWeatherInfoList);
}
weather(API_KEY);

async function weatherMoreInfo(input_value, api_key) {
  const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input_value}&appid=${api_key}`);

  renderMoreWeatherInfo(request, elWeatherInfoList);
}

elWeatherForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const inputValue = elWeatherInput.value;

  weatherMoreInfo(inputValue, API_KEY);
});