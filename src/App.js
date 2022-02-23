import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import publicIp from 'public-ip';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodayHeader from './components/TodayHeader';
import CurrentWeather from './components/CurrentWeather';
import NextHeader from './components/NextHeader';
import NextHoursContainer from './components/NextHoursContainer';
import NextDaysContainer from './components/NextDaysContainer';
import localforage from 'localforage';
import SearchBar from './components/SearchBar';
const weatherData = require('./data/weather.json');


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
      userZip: '',
      userCity: '',
      initialLocation: false,
      location: null,
    }
  }

  // getUserIP = async () => {
  //   const responseIP = await publicIp.v4();
  //   if (responseIP) {
  //     this.setState({ userIP: responseIP });
  //     return true;
  //   }

  //   return false;
  // }

  getData = async () => {
    await axios.get(`https://ipinfo.io?token=b1ca041c2a1875`).then(responseLocation => responseLocation.data).then((data) => {
      console.log(data)
      this.setState({ userZip: data.postal });
      this.setState({ userCity: data.city });
      this.setState({ initialLocation: true });
      this.setState({ location: data.loc }); //"41.9543,-87.6575"
      this.setState({ weatherFetchedTimestamp: new Date() });
      console.log(this.state)
      return data.loc;
    }).then(loc => {
      const [lat, lon] = loc.split(',');
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e6bc03461c846b8a1945a98689bcd120`)
      .then(weatherData => weatherData.data).then(weatherData => {
        this.setState({ weatherCurrent: weatherData.current });
        this.setState({ weatherToday: weatherData.daily[0] });
        this.setState({ todayLow: weatherData.daily[0].temp.min });
        this.setState({ todayHigh: weatherData.daily[0].temp.max });
        console.log(weatherData)
      });
    })
    .catch(error => {
      this.setState({ initialLocation: false });
      console.log(error);
    })
  }

  isOverTenMinutes(tmeStamp) {
    return Math.ceil(new Date(tmeStamp) - new Date()) >= 10;
  }

  componentDidMount = async () => {
    await this.getData();
  }



  render() {
    if (!this.state.initialLocation || !this.state.weatherCurrent) return <p>Loading...</p>

    return (
      <div>
        <Container>
          <SearchBar />
        </Container>
        {this.state.initialLocation ?
          <Container>

            <TodayHeader />
            <CurrentWeather city={this.state.userCity} currentTemp={Math.ceil(this.state.weatherCurrent.temp)} highTemp={this.state.todayHigh} lowTemp={this.state.todayLow} iconUrl={this.state.weatherCurrent.weather[0].icon} />
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
