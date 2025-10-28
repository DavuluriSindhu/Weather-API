# Weather-API
# My Webpage Project

This is a simple webpage I developed using HTML, CSS, and JavaScript.

## 📂 Project Structure
- `index.html` — main webpage file
- `style.css` — contains styles
- `script.js` — handles page interactions

## ⚙️ How to Run
1. Open `index.html` in your browser.
2. Make sure all CSS and JS files are in the same folder.

## 🧑‍💻 Technologies Used
- HTML5  
- CSS3  
- JavaScript  
- VS Code
`index.html` — main webpage file:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weather App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>Weather App</h1>
    <input type="text" id="cityInput" placeholder="Enter city name" />
    <button id="searchBtn">Get Weather</button>

    <div id="weatherResult" class="weather-card hidden">
      <h2 id="cityName"></h2>
      <p id="temperature"></p>
      <p id="condition"></p>
      <p id="wind"></p>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>

style.css` — contains styles:
body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to bottom right, #a1c4fd, #c2e9fb);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  
  .container {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    text-align: center;
    width: 320px;
  }
  
  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 10px 20px;
    background: #4e8ef7;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background: #2f6de1;
  }
  
  .weather-card {
    margin-top: 20px;
  }
  
  .hidden {
    display: none;
  }
  
  script.js` — handles page interactions:

  const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherResult");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    // 1️⃣ Get coordinates from Geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Fetch weather data
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    const weather = weatherData.current_weather;

    // 3️⃣ Display results
    document.getElementById("cityName").textContent = `${name}, ${country}`;
    document.getElementById("temperature").textContent = `🌡️ Temperature: ${weather.temperature}°C`;
    document.getElementById("condition").textContent = `☁️ Condition: ${weather.weathercode}`;
    document.getElementById("wind").textContent = `💨 Wind Speed: ${weather.windspeed} km/h`;

    weatherCard.classList.remove("hidden");
  } catch (error) {
    alert("Error fetching data. Please try again.");
    console.error(error);
  }
});



