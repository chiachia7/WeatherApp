document.addEventListener('DOMContentLoaded', function () {
    // ここに今までのコードを全部入れる  
// 要素を取得
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResult = document.getElementById('weatherResult');

// const apiKey = 'xxxxxxxxxxxxxxxx';
// 今は空にしておく
const apiKey = '';

searchButton.addEventListener('click', () => {
  const cityName = cityInput.value;
  weatherResult.textContent = `Getting weather for: ${cityName}...`;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const weatherMain = data.weather[0].main;
      const humidity = data.main.humidity;

      // 絵文字マッピング
      const weatherEmojiMap = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Haze: "🌫️",
        Fog: "🌁",
        Smoke: "💨",
        Dust: "🌪️",
        Sand: "🏜️"
      };

      const emoji = weatherEmojiMap[weatherMain] || "🌈";

      weatherResult.innerHTML = `
        <p>${emoji} Weather: ${weatherMain}</p>
        <p>🌡️ Temp: ${temp}℃</p>
        <p>💧 Humidity: ${humidity}%</p>
      `;

      weatherResult.style.visibility = 'visible';

    })
    .catch(error => {
      weatherResult.textContent = 'City not found or an error occurred.';
      console.error(error);
    });
});

});
