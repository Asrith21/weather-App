import "./weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    error: false,
    data: {},
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather((prev) => ({ ...prev, loading: true }));

      const url = "https://api.openweathermap.org/data/2.5/weather";
      const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

      try {
        const response = await axios.get(url, {
          params: {
            q: input,
            units: "metric",
            appid: apiKey,
          },
        });

        setWeather({
          data: response.data,
          loading: false,
          error: false,
        });
      } catch (error) {
        setWeather((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    }
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>WeatherApp</h1>
      </div>

      <div className="input p-4 fw-bold">
        <label htmlFor="cityName">CityName:</label>
        <input
          type="text"
          id="cityName"
          className="ms-1 w-25 input-field"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={search}
          placeholder="Enter the city name"
        ></input>
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>

          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/$%7Bweather.data.weather%5B0%5D.icon%7D@2x.png%60%7D`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
