const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = '';
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    console.log(city)
    if (city) {
        //llamar a api para que nos de la info del clima
        fetchWeather(city)
    } else {
        alert('Ingrese una ciudad valida');
    }
})

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(data => data.json())
        .then(data => showWeatherData(data))
        .catch(error => console.log('Error: ', error));
}

function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName} , ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temperature - diffKelvin)}C`

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;//verificar en la docu como mostrar imagen

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripcion meteorologica es ${description}%`

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(iconInfo);
    divResponseData.appendChild(descriptionInfo);
}