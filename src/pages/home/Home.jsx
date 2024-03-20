import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import img2 from '../../assets/4102314_cloud_cloudy_sun_sunny_weather_icon.png';
import img1 from '../../assets/4102326_cloud_sun_sunny_weather_icon.png';
import img3 from '../../assets/4102328_hot_sun_weather_icon.png';
import img4 from '../../assets/4102315_cloud_weather_icon.png'
import img6 from '../../assets/4102316_cloud_drizzle_rain_weather_icon.png'
import img7 from '../../assets/4102321_crescent_half_half moon_moon_night_icon.png'

import './home.css'
import axios from 'axios';

const Home = () => {

  const [weatherImage, setWeatherImage] = useState(null)
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState({
    name: "", temp: "", description: "", time: "", wind: "", humidity: ""
  })
  const [toggleIcon, setToggleIcon] = useState(false)

  const fetchWeatherData = async () => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=985af1cbd565788126de9b773bc17da0`).then(response => {

      const timestamp = response.data.dt; // Unix timestamp from the API response
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedDate = date.toLocaleString('en-US', options);

      if (response.data.weather[0].description === "clear sky") {
        setWeatherImage(img1)
      } else if (response.data.weather[0].description === "few clouds") {
        setWeatherImage(img4)
      } else if (response.data.weather[0].description === "overcast clouds") {
        setWeatherImage(img2)
      } else if (response.data.weather[0].description === "light rain") {
        setWeatherImage(img6)
      } else if (response.data.weather[0].description === "scattered clouds") {
        setWeatherImage(img7)
      }
      else {
        setWeatherImage(img3)
      }

      setWeatherData({
        name: response.data.name,
        temp: (response.data.main.temp - 273.15).toFixed(2),
        description: response.data.weather[0].description,
        time: formattedDate,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity
      })
      setToggleIcon(prev => !prev)
    }).catch(error => {
      alert(error.response.data.message);
    });
  }

  const handleClose = () => {
    setCity("")
    setToggleIcon(prev => !prev)
  }

  return (
    <div className="home">
      <div className="container home_container ">
        <div className="city_input">
          <input type="text" placeholder='City name' onChange={e => setCity(e.target.value)} value={city} onFocus={() => setToggleIcon(false)} />
          {
            !toggleIcon ?
              <IoSearch className='icon' onClick={fetchWeatherData} />
              :
              <IoClose className='icon' onClick={handleClose} />
          }
        </div>
        {
          weatherData.name ?
            <>
              <div className="weather_info-container grid">
                <div className="weather_climate">
                  <img src={weatherImage} alt="cloudy sun" />
                </div>
                <div className="weather_data">
                  <h1>{weatherData.temp}°C</h1>
                  <h5>{weatherData.description}</h5>
                  <div className="date">
                    {/* <p>21-july-2023 <br /> Friday 12:44 PM <br />Monday</p> */}
                    <p>{weatherData.time}</p>
                  </div>
                  <h2>{weatherData.name}</h2>
                </div>
              </div>
              <div className="weather_info">
                <div className="weather_info-box">
                  <h6 className='title'>Wind</h6>
                  <h2 className="measurement">{weatherData.wind} km/h</h2>
                </div>
                <div className="weather_info-box">
                  <h6 className='title'>Humidity</h6>
                  <h2 className="measurement">{weatherData.humidity}%</h2>
                </div>
                <div className="weather_info-box">
                  <h6 className='title'>Temperature</h6>
                  <h2 className="measurement">{weatherData.temp}°C</h2>
                </div>
              </div>
            </>
            :
            <h2 id="cityNotFound" >weather data not found !</h2>
        }
      </div>
    </div>
  )
}

export default Home