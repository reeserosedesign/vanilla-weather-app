function formatDate(timestamp) {
  let now = new Date();

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  let meridian = `AM`;

  if (hour < 12) {
    meridian = `AM`;
  } else {
    meridian = `PM`;
  }

  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour === 0) {
    hour = "12";
  }

  let minute = now.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  let time = `${hour}:${minute} ${meridian}`;
  let fullDate = `${day}, ${month} ${date}`;

  return `${time}<br />${fullDate}`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let city = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
