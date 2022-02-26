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

type weatherObjectType = {
    dt: number,
    sunrise?: number,
    sunset?: number,
    moonrise?: number,
    moonset?: number,
    moon_phase?: number,
    temp: number | object,
    feels_like: number | object,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds:number,
    pop?: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    rain?: {
      "1h": number
    }
  }

type weatherAlertTypeArray = {
  sender_name: string,
  event: string,
  start: number,
  end: number,
  description: string,
  tags: String[]
}


interface userLocationDataProp {
  userIP: string,
  zip: string,
  city: string,
  region: string,
  country: string,
  initialLocation: boolean,
  location: null | string,
  timezone: string,
}

interface weatherDataProp {
  weatherCurrent: weatherObjectType | null,
  weatherToday: weatherObjectType | null,
  weatherHourly: weatherObjectType | null,
  todayLow: null | number,
  todayHigh: null | number,
  weatherDaily: weatherObjectType | null,
  timezone: string,
  alerts: boolean | null
}

type cachedObject = {
  lat: number,
  lon: number,
  timezone_offset: number,
  current: weatherObjectType,
  minutely: Array<weatherObjectType>,
  hourly: Array<weatherObjectType>,
  daily: Array<weatherObjectType>,
  alerts: null | String[],
  todayHigh: number,
  todayLow: number,
  timezone: string,
  weatherCurrent: weatherObjectType,
  weatherDaily: weatherObjectType[],
  weatherToday: weatherObjectType,
  data_cached_timestamp: string
}

function App() {
const [userLocationData, setUserLocationData] = useState<userLocationDataProp>({
  userIP: '',
  zip: '',
  city: '',
  region: '',
  country: '',
  initialLocation: false,
  location: null,
  timezone: ''
});

const [weatherData, setWeatherData] = useState<weatherDataProp>({
  weatherCurrent: null,
  weatherToday: null,
  weatherHourly: null,
  todayLow: null,
  todayHigh: null,
  weatherDaily: null,
  alerts: true,
  timezone: ''
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
      timezone: data.timezone, 
      userIP: data.ip,
    }); 
      return { loc: data.loc };
    }).then(data => {
      getWeatherData(data);
    })
    .catch(error => {
      setUserLocationData(state => ({...state,  initialLocation: false }));
      console.log(error);
    })
  }

  useEffect(() => {
    if (!userLocationData.initialLocation) {
      (async () => await getData())();
    }
  })

  async function getWeatherData(data: { loc: string; }) {
    const { loc } = data;
    const [lat, lon] = loc.split(',');
    const key = `${lat}${lon}`;
    
    localforage.getItem(key, function(err, value: cachedObject) {
      let cachedDataExpired: boolean;
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
            alerts: updatedWeatherData.alerts ? updatedWeatherData.alerts.map((alert: Array<weatherAlertTypeArray>) => alert.description).filter((el: string) => el).join(', ') : null,
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

      setUserLocationData(state => ({...state,
        zip: null,
        city: city,
        location: locationInput,
        initialLocation: true,
        region: region,
        country: country,
      }));

    } else if (validZiCode) {
      locationInput = [validZiCode.latitude, validZiCode.longitude].join(',');
      setUserLocationData(state => ({...state,
        zip: validZiCode.zip,
        city: validZiCode.city,
        location: locationInput,
        initialLocation: true,
        region: validZiCode.state,
        country: validZiCode.country,
      }));

    }
    getWeatherData({ 
      loc: locationInput
     });
     inputElement.value = '';
  }

  function filterHourlyWeatherToCurrentHours(arr: any[] | weatherObjectType, data: weatherDataProp) {
  console.log(data);
    moment.tz.setDefault(userLocationData.timezone);
    let now = moment();

    const ressultArr = arr.filter((el: { dt: any; }) => {
      let day = moment.unix(el.dt);
      if (now <= day) {
        return el;
      }
    })

    return ressultArr;
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
