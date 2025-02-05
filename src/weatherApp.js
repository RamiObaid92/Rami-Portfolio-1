const apiKey = "7f1d09672745a64fc16474a6667982e4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const form = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();

  try {
    const weatherData = await fetchWeather(cityName);
    updateCard(weatherData);
  } catch (error) {
    const existingError = card.querySelector(".text-danger");
    if (existingError) {
      existingError.remove();
    }

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("fs-5", "mt-3", "text-danger");
    errorMessage.textContent = "Invalid City, please insert correct City name!";
    card.appendChild(errorMessage);
    console.error(error);
  }

  cityInput.value = "";
  cityInput.focus();
});

async function fetchWeather(city) {
  const response = await fetch(
    `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();
  return data;
}

function updateCard(weatherData) {
  const elementsToRemove = card.querySelectorAll("h2, p:not(.cityInput)");
  elementsToRemove.forEach((el) => el.remove());

  const cityName = document.createElement("h2");
  cityName.textContent = weatherData.name;

  const temperature = document.createElement("p");
  temperature.classList.add("temp", "fs-3");
  temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;

  const humidity = document.createElement("p");
  humidity.classList.add("humidity", "fs-3");
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  const weatherDesc = document.createElement("p");
  weatherDesc.classList.add("weather-desc", "fs-3", "fst-italic");
  weatherDesc.textContent = weatherData.weather[0].description
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

  const weatherEmoji = document.createElement("p");
  weatherEmoji.classList.add("weather-emoji", "display-3");
  weatherEmoji.textContent = getWeatherEmoji(weatherData.weather[0].main);

  card.replaceChildren(
    cityName,
    temperature,
    humidity,
    weatherDesc,
    weatherEmoji,
    form
  );
}

function getWeatherEmoji(weather) {
  const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Fog: "🌫️",
    Mist: "🌫️",
  };
  return weatherIcons[weather];
}

document.addEventListener("DOMContentLoaded", async () => {
  const defaultCity = "Stockholm";

  try {
    const weatherData = await fetchWeather(defaultCity);
    updateCard(weatherData);
  } catch (error) {
    console.error("Error loading default city:", error);
  }
});
