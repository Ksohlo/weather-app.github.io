const apikey = '3db0a6476baea46cb60e194c4b47ef13';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const inputEl = document.querySelector('#input-el');
const searchBtn = document.querySelector('#search');
let weatherLogo = document.querySelector('#weather-logo');


document.querySelector('.mid').style.display = 'none';
document.querySelector('#bottom').style.display = 'none';



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    let data = await response.json();
    
    console.log(data);
    
    if(response.status === 404){
        document.getElementById('err').style.display = 'block';
        document.querySelector('.mid').style.display = 'none';
        document.querySelector('#bottom').style.display = 'none';
    }else{
        
         document.getElementById('err').style.display = 'none';
    
        //linking DOM to API if sucessful
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '&deg;C'; 
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.getElementById('wind-el').innerHTML = data.wind.speed + ` km/h`;

        if(data.weather[0].main === 'Clouds') {
            weatherLogo.src = 'resources/clouds.png';
        }else if(data.weather[0].main === 'Clear'){
            weatherLogo.src = 'resources/clear.png';
        }else if(data.weather[0].main === 'Drizzle'){
            weatherLogo.src = 'resources/drizzle.png';
        } else if(data.weather[0].main === 'Rain'){
            weatherLogo.src = 'resources/rain.png';
        }else if(data.weather[0].main === 'Mist'){
            weatherLogo.src = 'resources/mist.png';
        }else if(data.weather[0].main === 'Snow'){
            weatherLogo.src = 'resources/snow.png';
        }
    };
    return response;
}



searchBtn.addEventListener('click', ()=>{
    
        checkWeather(inputEl.value);
        document.querySelector('.mid').style.display = 'flex';
        document.querySelector('#bottom').style.display = 'flex';
        inputEl.value = '';
});