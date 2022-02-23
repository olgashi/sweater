import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodayHeader from './components/TodayHeader';
import CurrentWeather from './components/CurrentWeather';
import NextHeader from './components/NextHeader';
import NextHoursContainer from './components/NextHoursContainer';
import NextDaysContainer from './components/NextDaysContainer';
import localforage from 'localforage';
import SearchBar from './components/SearchBar';
const weatherData = require('./data/weather.json');
const zipcodes = require('zipcodes');


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userIP: '',
      weatherFetchedTimestamp: null,
      weatherCurrent: null,
      weatherToday: null,
      todayLow: null,
      todayHigh: null,
      zip: '',
      city: '',
      initialLocation: false,
      location: null,
    }
    this.isOverTenMinutes = this.isOverTenMinutes.bind(this);
    this.handleGetWeatherClick = this.handleGetWeatherClick.bind(this);
  }

  getData = async () => {
    console.log(this.state.weatherFetchedTimestamp);
    await axios.get(`https://ipinfo.io?token=b1ca041c2a1875`).then(responseLocation => responseLocation.data).then((data) => {
      this.setState({ zip: data.postal, city: data.city, initialLocation: true, location: data.loc }); //"41.9543,-87.6575"
      return { zip: data.postal, loc: data.loc };
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
    let isDataOverTenMinsOld = this.isOverTenMinutes(this.state.weatherFetchedTimestamp || new Date());

    const { zip, loc } = data;
    const key = zip;
    const [lat, lon] = loc.split(',');
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e6bc03461c846b8a1945a98689bcd120`)
    .then(weatherData => weatherData.data).then(weatherData => {
      localforage.getItem(key, function(err, value) {
        if (value === null || isDataOverTenMinsOld) {
          localforage.setItem(key, weatherData).then(function (value) {
          });
          this.setState({ weatherFetchedTimestamp: new Date() });
          
        } else {
          weatherData = value;

        }
      });
      const weatherToday = weatherData.daily[0];
      this.setState({ 
        weatherCurrent: weatherData.current, 
        weatherToday: weatherToday, 
        todayLow: weatherToday.temp.min, 
        todayHigh: weatherToday.temp.max });
      console.log(weatherData);
    });
  }

  handleGetWeatherClick() {
    const zipToSearch = document.getElementById('zip-code-input').value;
    const zipCodeData = zipcodes.lookup(zipToSearch);

    if (!zipCodeData) {
      alert('Please enter a valid zipcode');
      return null;
    } else {
      console.log(zipCodeData);
      this.setState({
        zip: zipCodeData.zip,
        city: zipCodeData.city,
        location: [zipCodeData.latitude, zipCodeData.longitude].join(','),
        initialLocation: true,
      });

      this.getWeatherData({ zip: zipCodeData.zip, loc: [zipCodeData.latitude, zipCodeData.longitude].join(',') });
    }
  }


  render() {

    return (
      <div>
        <Container>
          <SearchBar handleClick={this.handleGetWeatherClick}/>
        </Container>
        {this.state.initialLocation && this.state.weatherCurrent && this.state.weatherToday
        ?
          <Container>

            <TodayHeader />
            <CurrentWeather city={this.state.city} currentTemp={Math.ceil(this.state.weatherCurrent.temp)} highTemp={this.state.todayHigh} lowTemp={this.state.todayLow} iconUrl={this.state.weatherCurrent.weather[0].icon} />
            <NextHeader timeRange="hours" timeRangeAmount="5" />
            <NextHoursContainer hourly={weatherData.hourly} />
            <NextHeader timeRange="days" timeRangeAmount="3" />
            <NextDaysContainer daily={weatherData.daily} />

          </Container>

          : <p>
            Your location wasnt determined.
          </p>
        }
      </div>
    )
  }
}

export default App;
