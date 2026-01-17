const apiKey = "d9c0cd457f9e741d2685098200b5868f";

async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found");
        return;
    }

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weather-result").classList.remove("hidden");
}
