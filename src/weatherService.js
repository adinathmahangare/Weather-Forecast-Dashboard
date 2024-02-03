const API_KEY = "549196f394d24a13435c190e231bf673";

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWetherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res)=> res.json()).then((data)=>data);

    const {weather, main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
    wind: {speed},
    sys: {country},
    name,
} = data;

    const {description, icon} = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon), 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        pressure, 
        humidity, 
        speed, 
        country, 
        name,
    };
};

const getForecastData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res) => res.json());

    // Extract forecast data for the next five days
    const forecastData = data.list.slice(0, 5).map((item) => {
        const { dt_txt, main: { temp }, weather } = item;
        const { description, icon } = weather[0];
        return {
            date: dt_txt.split(' ')[0],
            temp,
            description,
            iconURL: makeIconURL(icon)
        };
    });

    return forecastData;
};

export { getFormattedWetherData, getForecastData };