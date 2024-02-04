import './weatherApp.css';
import searchBtn from '../img/search.png';
import sunny from '../img/sun.png';
import clouds from '../img/clouds.png';
import rain from '../img/rain.png';
import snow from '../img/snow.png';
import drizzle from '../img/drizzle.png';
import mist from '../img/mist.png';
import humidity from '../img/humidity.png';
import wind from '../img/wind.png';
import { useState } from 'react';
const WeatherApp = () => {

    let api_key = "228ef8534664de0df99afa0878e1f615";
    const [icon, setIcon] = useState(sunny);

    const search = async () => {
        const element = document.getElementsByClassName('input');
        if(element[0].value===''){
            return alert('Enter a city name!');
        }else{
            let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
            let response = await fetch(api_url);
            let data = await response.json();
            const humidity = document.getElementsByClassName('humidity');
            const wind = document.getElementsByClassName('wind');
            const temp = document.getElementsByClassName('temp');
            const location = document.getElementsByClassName('city');
            humidity[0].innerHTML = data.main.humidity + ' %';
            wind[0].innerHTML = data.wind.speed + ' km/h';
            temp[0].innerHTML = Math.round(data.main.temp) + '°C';
            location[0].innerHTML = `${data.name}, ${data.sys.country}`;
            
            if(data.weather[0].main ==='Clouds'){
               setIcon(clouds);
            } else if (data.weather[0].main === 'Clear'){
                setIcon(sunny)
            } else if (data.weather[0].main === 'Rain'){
                setIcon(rain)
            } else if (data.weather[0].main === 'Drizzle'){
                setIcon(drizzle)
            } else if (data.weather[0].main === 'Mist'){
                setIcon(mist)
            } else if(data.weather[0].main === 'Snow'){
                setIcon(snow)
            } document.querySelector(".info").style.display = 'block';
        }
    }

  return (
    <div className='container'>
        <div className="app">
        <div className='search-bar'>
            <input type='text' className='input' placeholder='Search City >>>'/>
            <span className='btn' onClick={() => {search()}}>
                <img src={searchBtn} alt="search button" className='btnImg'/>
            </span>
        </div>
        <div className='info'>
        <div className='weather-img'>
            <img src={ icon } alt="icon" />
        </div>
        <div className='temp'>0</div>
        <div className='city'>0</div>
        <div className='details'>
            <div className="element">
                <img src={ humidity } alt="humidity icon" className='icon'/>
                <div className="data">
                    <div className="humidity">60%</div>
                    <div className="title">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={ wind } alt="wind icon" className='icon'/>
                <div className="data">
                    <div className="wind">6km/h</div>
                    <div className="title">Speed</div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default WeatherApp;