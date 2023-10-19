import React, { useState } from "react";
import Clock from "react-live-clock";
import { FaSearch } from "react-icons/fa";
import "./Main.css";
const dateBuilder = (d) => {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
function Main() {
  const [data, setdata] = useState({
    country: undefined,
    humidity: undefined,
    windspeed: undefined,
    temp: undefined,
    icon: undefined,
    weather: undefined,
    city: undefined,
    feelslike: undefined,
  });
  const [location, setlocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=18b6e7544f4cc6d4579ff25c49800cc8&units=metric`;
  const handledata = async () => {
    const response = await fetch(url);
    const x = await response.json();
    console.log(x);
    console.log();
    if (data.cod !== 404) {
      setdata({
        country: x.sys.country,
        humidity: x.main.humidity + "g.m-3",
        windspeed: x.wind.speed + "mph",
        temp: Math.round(x.main.temp) + " °C",
        icon: x.weather[0].icon,
        weather: x.weather[0].main,
        city: x.name,
        feelslike: x.main.feels_like + "°C",
      });
    }
    setlocation(" ");
  };
  return (
    <div className="app">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap');
      </style>
      <div className="all">
        <div className="left">
          <div className="location">{data.city}</div>
          <div className="x">{data.temp}</div>
          <div className="date">
            <p id="time">{dateBuilder(new Date())}</p>
            <p id="time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </p>
          </div>
        </div>
        <div className="right">
          <div className="search">
            <input
              type="search"
              name="srch"
              id="search"
              placeholder="Enter Location"
              value={location}
              onChange={(event) => setlocation(event.target.value)}
            />
            <button className="btn" onClick={handledata}>
              <FaSearch />
            </button>
          </div>
          {data.country !== undefined && (
            <div className="undersearch">
              <div className="city">
                <p>
                  {data.city} {data.country}
                </p>
                <div className="icon">
                  <img
                    className="img"
                    src={`https://openweathermap.org/img/wn/${data.icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
              <hr id="hr" />
              <div className="temp">
                <p>Feels like: {data.feelslike}</p>
                <p>weather: {data.weather}</p>
              </div>
              <hr id="hr" />
              <div className="wind">
                <p>Humidity: {data.humidity}</p>
                <p>Windspeed: {data.windspeed}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
