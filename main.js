"use strict";

const apiKey = "9391ddcd941d0c7ac4b62518140148c8";

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
    const prevCard = document.querySelector(".card");
    if (prevCard) prevCard.remove();
}

form.onsubmit = async function(event) {
    // Отменяем отправку формы
    event.preventDefault();

    // Берем значение из инпута, обрезая пробельные символы
    let city = input.value.trim();

    // Делаем запрос на сервер
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}&units=metric`
    try {
        const res = await fetch(url);
        const data = await res.json();

        removeCard();

        console.log(data.weather[0].id);
        
        let conditions;
        let weatherId = data.weather[0].id;
        if (weatherId < 300) {
            conditions = "lightning";
        } else if (weatherId < 600) {
            conditions = "sun-clouds-rain";
        } else if (weatherId < 700) {
            conditions = "clouds-snow";
        } else if (weatherId === 800) {
            conditions = "sun";
        } else if (weatherId < 804) {
            conditions = "sun-clouds";
        } else {
            conditions = "clouds";
        }
        let imgPath = `./img/${conditions}.png`;

        // Создаем разметку для карточки
        const html = `<div class = "card">

            <h2 class="card-city">${city}</h2>
            
            <div class="card-weather">
                <div class="card-value">${Math.round(data.main.temp)}<span>℃</span></div>
                <img class="card-weather-img" src=${imgPath} alt="Weather Conditions">
            </div>

            <div class="card-description">${data.weather[0].description}</div>        

        </div>`

        // Вставляем разметку карточки после заголовка
        header.insertAdjacentHTML("afterend", html);

    } catch(err) {
        removeCard();

        const errorMessage = "Город не найден";
        const html = `<div class="card">${errorMessage}</div>`;

        // Вставляем разметку карточки после заголовка
        header.insertAdjacentHTML("afterend", html);
    }
}