const apiKey = "91177cdb5c9b4c3fb0685323230102";

const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector(".header");

// Слушаем отправку формы

form.onsubmit = function (e) {
  e.preventDefault();
  let city = input.value.trim();

  // Делаем запрос
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Проверка на ошибку

      if (data.error) {
        //Если есть ошибка выводим ее

        // Удаляем предыдущ. карточку
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        // Отображаем карточку с ошибкой
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Отображаем данные в карточке

        // Удаляем предыдущ. карточку

        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        // Разметка для карточки
        const html = ` <div class="card">
      <h2 class="card-sity">${data.location.name}<span>${data.location.country}</span></h2>
      <div class="card-weather">
        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
        <img class="card-img" src="/img/img.png" alt="weather" />
      </div>

      <div class="card-description">${data.current.condition.text}</div>
    </div>`;

        // Отображаем карточку
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
