
let btn = document.getElementById('fetch-weather-btn');

btn.addEventListener('click', fetchWeatherData);

async function fetchWeatherData() {
    let city = document.getElementById('city-input').value;
    if(city === '') {
        alert('Please enter a valid city name.');
        return
    }

    const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
    const options = {
	method: 'GET'
    };

    let parentDiv = document.getElementById('city-details');
    parentDiv.innerHTML='';

    tempDiv = document.getElementById('temp-div');
    if(tempDiv){
        tempDiv.remove();
    }

    cityDetailed = document.getElementById('city-detailed');
    if(cityDetailed){
        cityDetailed.remove();
    }

    try {
	    const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP greška: ${response.status}`);
        }
	    const result = await response.json();
	    console.log(result);

        
        let cityName = document.createElement('h2');
        cityName.textContent=result.location.name;
        parentDiv.appendChild(cityName);

        let cityCountry = document.createElement('p');
        cityCountry.textContent=result.location.country;
        parentDiv.appendChild(cityCountry);

        let cityTemperature = document.createElement('p');
        cityTemperature.id='city-temperature';
        cityTemperature.textContent=`${result.current.temperature} °C`;
        parentDiv.appendChild(cityTemperature);

        let cityDetailed = document.createElement('div');
        cityDetailed.id='city-detailed';
        document.body.appendChild(cityDetailed);

        let citySunrise = document.createElement('p');
        citySunrise.textContent=`Sunrise: ${result.current.astro.sunrise}`;
        cityDetailed.appendChild(citySunrise);

        let cityMoonrise = document.createElement('p');
        cityMoonrise.textContent=`Sunrise: ${result.current.astro.moonrise}`;
        cityDetailed.appendChild(cityMoonrise);

        let cityHumidity = document.createElement('p');
        cityHumidity.textContent=`Humidity: ${result.current.humidity} %`;
        cityDetailed.appendChild(cityHumidity);

        let cityWindSpeed = document.createElement('p');
        cityWindSpeed.textContent=`Wind Speed: ${result.current.wind_speed} km/h`;
        cityDetailed.appendChild(cityWindSpeed);

        let cityWindDegree = document.createElement('p');
        cityWindDegree.textContent=`Wind Degree: ${result.current.wind_degree} °`;
        cityDetailed.appendChild(cityWindDegree);

        let cityUvIndex = document.createElement('p');
        cityUvIndex.textContent=`UV Index: ${result.current.uv_index}`;
        cityDetailed.appendChild(cityUvIndex);

        let tempDiv = document.createElement('div');
        tempDiv.id='temp-div';
        document.body.appendChild(tempDiv);

        let tempLabel = document.createElement('h1');
        tempLabel.textContent='Temperature Gauge';
        tempDiv.appendChild(tempLabel);

        let tempBar = document.createElement('progress');
        tempBar.value = result.current.temperature 
        tempBar.max = 50;
        tempBar.id = 'temp-bar';
        tempDiv.appendChild(tempBar);

        

        if(result.current.temperature < 10){
            tempBar.style.setProperty("--progress-color", "#1E90FF");
        }

        else if(result.current.temperature < 20 && result.current.temperature >= 10){
            tempBar.style.setProperty("--progress-color","#00BFFF");
        }

        else if(result.current.temperature < 30 && result.current.temperature >= 20){
            tempBar.style.setProperty("--progress-color","#7CFC00");
        }

        else if(result.current.temperature < 40 && result.current.temperature >= 30){
            tempBar.style.setProperty("--progress-color","#FFD700");
        }
        else{
           tempBar.style.setProperty("--progress-color","#FF4500");
        }
        

            


    } catch (error) {
	    console.error(error);
        
        if(error.message.includes('400')) {
            alert('Bad Request: Please check the city name and try again.');
            
        }
    }


    

    

    

}