import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CurrentWeatherHeader from './components/CurrentWeatherHeader';
import CurrentWeather from './components/CurrentWeather';
import NextHeader from './components/NextHeader';
import NextHoursContainer from './components/NextHoursContainer';
import NextDaysContainer from './components/NextDaysContainer';
import localforage from 'localforage';
import SearchBar from './components/SearchBar';
import Alerts from './components/Alerts';
import env from "react-dotenv";
const zipcodes = require('zipcodes');
const moment = require('moment');
require('moment-timezone');


function App() {

const [userLocationData, setUserLocationData] = useState({
  userIP: '',
  zip: '',
  city: '',
  region: '',
  country: '',
  initialLocation: false,
  location: null,
  timezone: '',
  alerts: true
});

const [weatherData, setWeatherData] = useState({
  weatherCurrent: null,
  weatherToday: null,
  weatherHourly: null,
  todayLow: null,
  todayHigh: null,
  weatherDaily: null
})

  async function getData () {
    await axios.get(`https://ipinfo.io?token=b1ca041c2a1875`).then(responseLocation => responseLocation.data).then((data) => {
      setUserLocationData({ 
      zip: data.postal, 
      city: data.city, 
      initialLocation: true, 
      location: data.loc, //"41.9543,-87.6575"
      region: data.region,
      country: data.country, 
      timezone: data.timezone
    }); 
      return { loc: data.loc };
    }).then(data => {
      getWeatherData(data);
    })
    .catch(error => {
      setUserLocationData({ initialLocation: false });
      console.log(error);
    })
  }

  useEffect(() => {
    if (!userLocationData.initialLocation) {
      (async () => await getData())();
    }
  })

  async function getWeatherData(data) {
    const { loc } = data;
    const [lat, lon] = loc.split(',');
    const key = `${lat}${lon}`;
    
    localforage.getItem(key, function(err, value) {
      let cachedDataExpired;
      if (value) {
        const cacheSavedTime = moment(value.data_cached_timestamp);
        const timeNow = moment();
        cachedDataExpired = Math.abs(timeNow.diff(cacheSavedTime, 'minutes')) > 10;
      }
      
      if (value === null || (value && cachedDataExpired)) { // Get data and Store it in cache for future uses
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${env.OPEN_WEATHER_MAP_TOKEN}`)
        .then(response => response.data).then(fetchedWeatherData => {

          fetchedWeatherData['data_cached_timestamp'] = new Date();
          localforage.setItem(key, fetchedWeatherData).then(function (fetchedWeatherData) {
            console.log('Setting item in cache', JSON.stringify(fetchedWeatherData));
          });
          return fetchedWeatherData;
        }).then(updatedWeatherData => {
          const newWeatherData = updatedWeatherData.daily[0];
          setWeatherData({
            timezone: updatedWeatherData.timezone,
            weatherCurrent: updatedWeatherData.current, 
            weatherToday: newWeatherData, 
            weatherHourly: updatedWeatherData.hourly,
            weatherDaily: updatedWeatherData.daily,
            todayLow: newWeatherData.temp.min ? newWeatherData.temp.min : null, 
            todayHigh: newWeatherData.temp.max ? newWeatherData.temp.max : null,
            alerts: updatedWeatherData.alerts ? updatedWeatherData.alerts.map(alert => alert.description).filter(el => el).join(', ') : null,
          });
        })
      } else { // Use data from cache
        const weatherToday = value.daily[0];

        setWeatherData({
          timezone: value.timezone,
          weatherCurrent: value.current, 
          weatherToday: weatherToday,
          weatherHourly: value.hourly,
          weatherDaily: value.daily,
          todayLow: weatherToday.temp ? weatherToday.temp.min : null, 
          todayHigh: weatherToday.temp ? weatherToday.temp.max : null,
          alerts: value.alerts ? value.alerts.map(alert => alert.description).filter(el => el).join(', ') : null,

        });
      }
    });
  }

  function handleGetWeatherClick() {
    const inputElement = document.getElementById('user-input-location-search')
    const userSearchInput = inputElement.value;
    inputElement.value = ''; //FIXME doesnt clear input value
    const validZiCode = zipcodes.lookup(userSearchInput);
    const lat = inputElement.getAttribute('lat');
    const lon = inputElement.getAttribute('lon');
    const city = inputElement.getAttribute('city');
    const region = inputElement.getAttribute('region');
    const country = inputElement.getAttribute('country');

    let locationInput= '';

    if (lat && lon) {
      locationInput = [lat, lon].join(',');

      setUserLocationData({
        zip: null,
        city: city,
        location: locationInput,
        initialLocation: true,
        region: region,
        country: country,
      });

    } else if (validZiCode) {
      locationInput = [validZiCode.latitude, validZiCode.longitude].join(',');
      setUserLocationData({
        zip: validZiCode.zip,
        city: validZiCode.city,
        location: locationInput,
        initialLocation: true,
        region: validZiCode.state,
        country: validZiCode.country,
      });

    }
    getWeatherData({ 
      loc: locationInput
     });
     inputElement.value = '';
  }

  function filterHourlyWeatherToCurrentHours(arr, data) {
  console.log(data);
    moment.tz.setDefault(userLocationData.timezone);
    let now = moment();

    return arr.filter(el => {
      let day = moment.unix(el.dt);
      if (now <= day) {
        return el;
      }
    })
  }

    return (
      <div>
      <Container>
        <Row>
          <Col>
          <SearchBar handleClick={handleGetWeatherClick}/>
          <Row className="no-search-results-message"></Row>
          </Col>

        </Row>
      </Container>
        {userLocationData.initialLocation && 
          weatherData.weatherCurrent && 
          weatherData.weatherToday && 
          weatherData.weatherHourly && 
          weatherData.weatherDaily
        ?
          <Container>
            <CurrentWeatherHeader />
            <CurrentWeather 
              currentWeatherData={weatherData.weatherCurrent}
              city={userLocationData.city} 
              region={userLocationData.region}
              country= {userLocationData.country} 
              highTemp={weatherData.todayHigh} 
              lowTemp={weatherData.todayLow} />
              {weatherData.alerts ?
                <Alerts alerts={weatherData.alerts}/> : <></>}
            <NextHeader timeRange="hours" timeRangeAmount="5" />
            <NextHoursContainer hourly={filterHourlyWeatherToCurrentHours(weatherData.weatherHourly, weatherData)} timezone={userLocationData.timezone}/>
            <NextHeader timeRange="days" timeRangeAmount="7" />
            <NextDaysContainer daily={weatherData.weatherDaily} numDays="7" timeZone={userLocationData.timezone}/>
          </Container>
          : <p>
            We weren&apos;t able to determine your location. Please use search to find the location you are looking for
          </p>
        }
      </div>
    )
  }

export default App;
