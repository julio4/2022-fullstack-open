import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const endpoint = "http://api.weatherstack.com";

    axios
      .get(`${endpoint}/current?access_key=${api_key}&query=${city}`)
      .then((response) => {
        setWeather(response.data.current);
        setLoading(false);
      });
  }, [city]);

  return !loading ? (
    <div>
      <h2>Weather in {city}</h2>
      <p>
        <strong>temperature: </strong>
        {weather.temperature}
      </p>
      {weather.weather_icons.map((icons, index) => (
        <img src={icons} width="50" key={index} alt="Weather icons" />
      ))}

      <p>
        <strong>wind: </strong> {weather.wind_speed} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  ) : (
    <div>
      <h2>Weather in {city}</h2>
      <p>loading ...</p>
    </div>
  );
};

export default Weather;
