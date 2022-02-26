import React from 'react';
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


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userIP: '',
      weatherCurrent: null,
      weatherToday: null,
      weatherHourly: null,
      todayLow: null,
      todayHigh: null,
      weatherDaily: null,
      zip: '',
      city: '',
      region: '',
      country: '',
      initialLocation: false,
      location: null,
      timezone: '',
      alerts: true
    }
    this.isOverTenMinutes = this.isOverTenMinutes.bind(this);
    this.handleGetWeatherClick = this.handleGetWeatherClick.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  getData = async () => {
    await axios.get(`https://ipinfo.io?token=b1ca041c2a1875`).then(responseLocation => responseLocation.data).then((data) => {
    this.setState({ 
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
      this.getWeatherData(data);
    })
    .catch(error => {
      this.setState({ initialLocation: false });
      console.log(error);
    })
  }

  isOverTenMinutes(tmeStamp) {
    const timeDifference = Math.floor(((new Date() - new Date(tmeStamp))/1000)/60);
    return  timeDifference >= 10;
  }

  componentDidMount = async () => {
    if (!this.state.initialLocation) {
      await this.getData();
    }
  }

  getWeatherData(data) {
    const self = this;
    const { loc } = data;
    const [lat, lon] = loc.split(',');
    const key = `${lat}${lon}`;
    
    localforage.getItem(key, function(err, value) {
      let weatherDataToDisplay;
      let cachedDataExpired;
      if (value) {
        const cacheSavedTime = moment(value.data_cached_timestamp);
        const timeNow = moment();
        cachedDataExpired = Math.abs(timeNow.diff(cacheSavedTime, 'minutes')) > 10;
      }
      
      if (value === null || (value && cachedDataExpired)) { // Get data and Store it in cache for future uses
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${env.OPEN_WEATHER_MAP_TOKEN}`)
        .then(weatherData => weatherData.data).then(weatherData => {
          
          weatherDataToDisplay = weatherData;
          weatherData['data_cached_timestamp'] = new Date();
          localforage.setItem(key, weatherData).then(function (value) {
            console.log('Setting item in cache', JSON.stringify(weatherData));
          });
          return weatherData;
        }). then( weatherData => {
          const newWeatherData = weatherData.daily[0];
          self.setState({
            timezone: weatherData.timezone,
            weatherCurrent: weatherData.current, 
            weatherToday: newWeatherData, 
            weatherHourly: weatherData.hourly,
            weatherDaily: weatherData.daily,
            todayLow: newWeatherData.temp.min ? newWeatherData.temp.min : null, 
            todayHigh: newWeatherData.temp.max ? newWeatherData.temp.max : null,
            alerts: weatherData.alerts ? weatherData.alerts.map(alert => alert.description).filter(el => el).join(', ') : null,
          });
        })
      } else { // Use data from cache
        const weatherToday = value.daily[0];

        self.setState({
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

  handleGetWeatherClick() {
    const inputElement = document.getElementById('user-input-location-search')
    const zipToSearch = inputElement.value;
    // inputElement.value = ''; //FIXME doesnt clear input value
    const zipCodeData = zipcodes.lookup(zipToSearch);
    const lat = inputElement.getAttribute('lat');
    const lon = inputElement.getAttribute('lon');
    const city = inputElement.getAttribute('city');
    const region = inputElement.getAttribute('region');
    const country = inputElement.getAttribute('country');

    let locationInput= '';

    if (lat && lon) {
      locationInput = [lat, lon].join(',');

      this.setState({
        zip: null,
        city: city,
        location: locationInput,
        initialLocation: true,
        region: region,
        country: country,
      });

    } else if (zipCodeData) {
      locationInput = [zipCodeData.latitude, zipCodeData.longitude].join(',');
      this.setState({
        zip: zipCodeData.zip,
        city: zipCodeData.city,
        location: locationInput,
        initialLocation: true,
        region: zipCodeData.state,
        country: zipCodeData.country,
      });

    }
    this.getWeatherData({ 
      loc: locationInput
     });
     inputElement.value = '';
  }

  filterHourlyWeatherToCurrentHours(arr) {
    moment.tz.setDefault(this.state.timezone);
    let now = moment();

    return arr.filter(el => {
      let day = moment.unix(el.dt);
      if (now <= day) {
        return el;
      }
    })
  }

  render() {
    return (
      <div>
      <Container>
        <Row>
          <Col>
          <SearchBar handleClick={this.handleGetWeatherClick}/>
          <Row className="no-search-results-message"></Row>
          </Col>

        </Row>
      </Container>
        {this.state.initialLocation && 
        this.state.weatherCurrent && 
        this.state.weatherToday && 
        this.state.weatherHourly && 
        this.state.weatherDaily
        ?
          <Container>
            <CurrentWeatherHeader />
            <CurrentWeather 
              currentWeatherData={this.state.weatherCurrent}
              city={this.state.city} 
              region={this.state.region}
              country= {this.state.country} 
              highTemp={this.state.todayHigh} 
              lowTemp={this.state.todayLow} />
              {this.state.alerts ?
                <Alerts alerts={this.state.alerts}/> : <></>}
            <NextHeader timeRange="hours" timeRangeAmount="5" />
            <NextHoursContainer hourly={this.filterHourlyWeatherToCurrentHours(this.state.weatherHourly)} timezone={this.state.timezone}/>
            <NextHeader timeRange="days" timeRangeAmount="7" />
            <NextDaysContainer daily={this.state.weatherDaily} numDays="7" timeZone={this.state.timezone}/>
          </Container>

          : <p>
            We weren't able to determine your location. Please use search to find the location you are looking for
          </p>
        }
      </div>
    )
  }
}

export default App;
