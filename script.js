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
