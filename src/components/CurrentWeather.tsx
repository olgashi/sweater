import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { allWordsWoUpper } from '../utils/text-utils';
const moment = require('moment-timezone');

export default function (props) {
  const { timezone, feels_like, humidity, wind_speed, temp, sunset, sunrise} = props.currentWeatherData;
  const { city, region, country } = props;
  const { description, icon } = props.currentWeatherData.weather[0];
  moment.tz.setDefault(timezone);
  const locationName = `${city ? city + ', ' : ''} ${region ? region + ',' : ''} ${country ? country: ''}`
  return (
    <Row className="today-container" md={8}>
      <Col md={3}>
        <Row className="region">{locationName}</Row>
        <Row className="temp-weather">
          <span className="current-temp">
          {Math.round(temp)} F
          </span>
        </Row>
        <Row md={5} className="current-weather-description">{allWordsWoUpper(description)}</Row>
      </Col>
      <Col md={2}>
      <Image src={`http://openweathermap.org/img/wn/${icon}.png`} className="current-icon">
      </Image>
      </Col>
      <Col md={2}>
        <Row md={4} className="current-temp-low">Low: {Math.round(props.lowTemp)} F</Row>
        <Row md={4} className="current-temp-high">High: {Math.round(props.highTemp)} F</Row>
      </Col>
      <Col md={2}>
        <Row className="current-temp-feels-like">Feels Like: {Math.round(feels_like)} F</Row>
        <Row className="current-temp-wind">Wind: {Math.round(wind_speed)} mph</Row>
        <Row className="current-temp-humidity">Humidity: {Math.round(humidity)}%</Row>
      </Col>
      <Col md={1}>
        </Col>
      <Col md={1}>
        <Row className="current-temp-sunset">
        sunset:         
        <div>
          <img src={require('../images/sunset.png')}></img>
        </div>
        </Row>
        <Row className="current-temp-sunset">
        {moment.unix(sunset).format('h:mm a')}
        </Row>
      </Col>
    
        <Col md={1}>
        <Row className="current-temp-sunrise">
        sunrise:
        <div>
          <img src={require('../images/sunrise.png')}></img>
        </div>
         </Row>
        <Row className="current-temp-sunrise">
         {moment.unix(sunrise).format('h:mm a')}

        </Row>
      </Col>
    </Row>
  )
}