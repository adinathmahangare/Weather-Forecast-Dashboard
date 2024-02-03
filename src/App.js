import { useEffect, useState } from 'react';
import { getFormattedWetherData, getForecastData } from './weatherService';
import Descriptions from "./components/descriptions";
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState('');
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherData = await getFormattedWetherData(city, units);
        setWeather(weatherData);
  
        const threshold = units === "metric" ? 20 : 68; 
        const temperature = weatherData.temp;
        if (temperature <= threshold) {
          setBg('linear-gradient(to bottom, #87CEEB, #1E90FF)');
        } else {
          setBg('linear-gradient(to bottom, #FFA07A, #FF6347)');
        }
  
        const forecastData = await getForecastData(city, units);
        setForecast(forecastData);
        toast.dismiss(); // Dismiss any previous toast messages
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeather(null);
        setForecast(null);
        toast.error('City not found. Please enter a valid city name.', {
          autoClose: 5000
        });
      }
    };
  
    if (city.trim() !== "") {
      fetchWeatherData();
    } else {
      toast.warn('Please enter a city name.', {
        autoClose: 3000
      });
    }
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  }

  const handleSearch = () => {
    const cityInput = document.querySelector('input[name="city"]');
    const enteredCity = cityInput.value.trim();
    if (enteredCity !== "") {
      setCity(enteredCity);
    } else {
      toast.warn('Please enter a city name.', {
        autoClose: 3000
      });
    }
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{background: bg}}>
      <ToastContainer />

      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={handleSearch}>
                <FaSearch /> 
              </button>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />

            <div className="section section__forecast">
              <h2>5-Day Forecast</h2>
              <ul>
                {forecast && forecast.map((forecastItem, index) => (
                  <li key={index}>
                    <h5>{forecastItem.date}</h5> 
                    <img src={forecastItem.iconURL} alt="weatherIcon" />
                    <h3>{forecastItem.temp.toFixed()}&deg;{units === "metric" ? "C" : "F"}</h3>
                    <p>{forecastItem.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>  
    </div>
  );
}

export default App;
