import React, { useEffect, useState } from 'react';
import axios from 'axios';
import localforage from 'localforage';
import env from "react-dotenv";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {filterHourlyWeatherToCurrentHours, getAlerts, getLocationLookupDataFromInput} from  './utils/general-utils';
import {CACHE_EXPIRATION_MINUTES } from './utils/const-utils'

import CurrentWeatherHeader from './components/CurrentWeatherHeader';
import CurrentWeather from './components/CurrentWeather';
import NextHeader from './components/NextHeader';
import NextHoursContainer from './components/NextHoursContainer';
import NextDaysContainer from './components/NextDaysContainer';
import SearchBar from './components/SearchBar';
import Alerts from './components/Alerts';

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
  alerts: true
});

const [weatherData, setWeatherData] = useState({
  weatherCurrent: null,
  weatherToday: null,
  weatherHourly: null,
  weatherDaily: null
})

  async function getData () {
    await axios.get(`https://ipinfo.io?token=${env.IP_TOKEN}`).then(responseLocation => responseLocation.data).then((data) => {
      setUserLocationData({ 
      zip: data.postal, 
      city: data.city, 
      initialLocation: true, 
      location: data.loc, //"41.9543,-87.6575"
      region: data.region,
      country: data.country, 
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
    
    localforage.getItem(key, function(_, cachedWeatherData) {
      let cachedDataExpired;
      if (cachedWeatherData) {
        const cacheSavedTimestamp = moment(cachedWeatherData.data_cached_timestamp);
        const timeNow = moment();
        cachedDataExpired = Math.abs(timeNow.diff(cacheSavedTimestamp, 'minutes')) > CACHE_EXPIRATION_MINUTES;
      }
      
      if (cachedWeatherData === null || (cachedWeatherData && cachedDataExpired)) { // Get data and Store it in cache for future uses
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${env.OPEN_WEATHER_MAP_TOKEN}`)
        .then(response => response.data).then(fetchedWeatherData => {
          fetchedWeatherData['data_cached_timestamp'] = new Date();
          localforage.setItem(key, fetchedWeatherData).then(function (fetchedWeatherData) {
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
            alerts: getAlerts(updatedWeatherData),
          });
        })
      } else { // Use data from cache
        const weatherToday = cachedWeatherData.daily[0];

        setWeatherData({
          timezone: cachedWeatherData.timezone,
          weatherCurrent: cachedWeatherData.current, 
          weatherToday: weatherToday,
          weatherHourly: cachedWeatherData.hourly,
          weatherDaily: cachedWeatherData.daily,
          alerts: getAlerts(cachedWeatherData), // TODO test alerts
        });
      }
    });
  }

  function handleGetWeatherClick() {
    const { lat, lon, city, region, country, userSearchInput } = getLocationLookupDataFromInput('user-input-location-search')
    const validZipCode = zipcodes.lookup(userSearchInput);

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

    } else if (validZipCode) {
      locationInput = [validZipCode.latitude, validZipCode.longitude].join(',');

      setUserLocationData({
        zip: validZipCode.zip,
        city: validZipCode.city,
        location: locationInput,
        initialLocation: true,
        region: validZipCode.state,
        country: validZipCode.country,
      });
    }
    getWeatherData({ 
      loc: locationInput
     });
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
              userLocation={userLocationData}
              weatherData={weatherData}
              />
              {weatherData.alerts ?
                <Alerts alerts={weatherData.alerts}/> : <></>}
            <NextHeader timeRange="hours" timeRangeAmount="5" />
            <NextHoursContainer hourly={filterHourlyWeatherToCurrentHours(weatherData.weatherHourly, userLocationData)} timezone={weatherData.timezone}/>
            <NextHeader timeRange="days" timeRangeAmount="7" />
            <NextDaysContainer daily={weatherData.weatherDaily} numDays="7" timeZone={weatherData.timezone}/>
          </Container>
          : <p className="welcome">
            Welcome to Sweater weather App! Please type in the name of the city or region you would like to see the weather forcast for.
          </p>
        }
      </div>
    )
  }

export default App;
