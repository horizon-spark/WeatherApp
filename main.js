"use strict";

document.addEventListener("DOMContentLoaded", getWeather);

const city = document.querySelector(".city");
city.addEventListener("keypress", setCity);

async function getWeather() {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=9391ddcd941d0c7ac4b62518140148c8&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    const weatherIcon = document.querySelector(".weather-icon");
    const temperature = document.querySelector(".temperature");
    const weatherDescription = document.querySelector(".weather-decription");
    
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}C`;
    weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
    if (event.code === "Enter") {
        getWeather();
        city.blur();
    }
}