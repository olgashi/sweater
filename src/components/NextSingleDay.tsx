import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { allWordsWoUpper } from '../utils/text-utils';

export default function NextSingleDay (props) {
  const {
    day, description, tempLow, tempHigh, iconUrl, 
    feelsLikeTemp, humidity, sunrise, sunset, percipitation,
    wind, cloudness, uvIndex
    } = props;
  return (
      <Row className="single-day-weather">
        <Col md={2}>
        <Row className="next-day-weekday">
        {day}
        </Row>
        <Row className="next-day-description">
        {allWordsWoUpper(description)}
        </Row>
        </Col>

        <Col md={1}>
        <Image src={iconUrl} className="next-day-icon"/>
        </Col>
        <Col md={3}>

        <Row className="next-day-low-high">
        low/high:
        </Row>

        <Row className="next-day-low-high-temp">
        {Math.round(tempLow)}/
        {Math.round(tempHigh)} F
        </Row>
        <Row className="next-day-feels-like">Feels like: {feelsLikeTemp}</Row>
        {percipitation ? <>
          <Row className="next-day-percipitation">
          {percipitation.type}: {percipitation.value}" expected
        </Row>
        </> : <></>}

        </Col>
      <Col md={1}>
        <Row className="next-day-sunset-icon">
        sunset:         
        <div>
          <img src={require('../images/sunset.png')}></img>
        </div>
        </Row>
        <Row className="next-day-sunset">
        {sunset}
        </Row>
      </Col>
    
        <Col md={1}>
        <Row className="next-day-sunrise-icon">
        sunrise:
        <div>
          <img src={require('../images/sunrise.png')}></img>
        </div>
         </Row>
        <Row className="next-day-sunrise">
         {sunrise}

        </Row>

        </Col>
        <Col md={1}></Col>
        <Col md={3}>
          <Row className="next-day-humidity">Humidity: {humidity}</Row>
          <Row className="next-day-wind">Wind: {wind} mph</Row>
          <Row className="next-day-uvindex">UV Index: {uvIndex}</Row>
          <Row className="next-day-cloudness">Cloudness: {cloudness}</Row>
        </Col>
      </Row>
  )
}

// NextSingleDay.propTypes = {
//   day: PropTypes.string, 
//   description: PropTypes.string, 
//   tempLow: PropTypes.string, 
//   tempHigh: PropTypes.string, 
//   iconUrl: PropTypes.string, 
//   feelsLikeTemp: PropTypes.string,
//   humidity: PropTypes.string,
//   sunrise: PropTypes.string,
//   sunset: PropTypes.string,
//   percipitation: PropTypes.string,
//   wind: PropTypes.string,
//   cloudness: PropTypes.string,
//   uvIndex: PropTypes.string,
// }