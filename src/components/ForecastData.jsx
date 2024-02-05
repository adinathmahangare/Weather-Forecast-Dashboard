import React from 'react'

const ForecastData = ({ forecast, units }) => {
    return (
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
)};

export default ForecastData