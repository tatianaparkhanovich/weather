function currentTime() {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  hour = updateTime(hour);
  min = updateTime(min);

  document.getElementById("digitalClock").innerText = hour + ":" + min;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

function updateTime(update) {
  if (update < 10) {
    return "0" + update;
  } else {
    return update;
  }
}
currentTime();

const forecast = document.querySelector(".forecast");
const current = document.querySelector(".current");

const renderCurrentCard = (src, weatherPrecipitation, temper, speed) => {
  current.insertAdjacentHTML(
    "beforeend",
    `<div class="picture">
      <img
        class="current-picture"
        src="${src}"
        alt=""
      />
      <h2>${weatherPrecipitation}</h2>
      <div class="temperature">${temper}</div>
      <div class="speed">
        <h2>Speed</h2>
        <h2 id="windSpeed">${speed}</h2>
      </div>
    </div>`
  );
};

const renderCard = (date, time, src, temp) => {
  forecast.insertAdjacentHTML(
    "beforeend",
    `<div class="forecast-wrapper">
            <div class="time">
              <div class="data">${date}</div>
              <div class="forecast-time">${time}</div>
            </div>
            <div class="picture">
              <img
                class="future-weather"
                src="${src}"
                alt=""
              />
            </div>
            <div class="forecast-temper">${temp}</div>
          </div>`
  );
};
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=c059564471597abd5ab4976660a429b6&units=metric"
)
  .then((response) => response.json())
  .then((obj) => {
    const weatherForecast = obj;
    const img = `https://openweathermap.org/img/wn/${weatherForecast.list[0].weather[0].icon}@2x.png`;
    const precipitation = weatherForecast.list[0].weather[0].main;
    const temperature = Math.round(weatherForecast.list[0].main.temp) + " ° С";
    const windSpeed = weatherForecast.list[0].wind.speed + " m/s";
    renderCurrentCard(img, precipitation, temperature, windSpeed);
    weatherForecast.list.forEach((el, i) => {
      if (i % 8 === 0) {
        let data = el.dt_txt.split(" ")[0];
        const time = el.dt_txt.split(" ")[1];
        const image = `https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
        const temp = Math.round(el.main.temp) + " ° С";
        renderCard(data, time, image, temp);
      }
    });
  });
