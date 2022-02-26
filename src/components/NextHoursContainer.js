import React from 'react';
import { Row } from 'react-bootstrap';
import NextSingleHour from './NextSingleHour';
const moment = require('moment-timezone');

export default function NextHoursContainer(props) {
  const nextFiveHoursArr = props.hourly.slice(0, 5);
  const timezone = props.timezone;
  moment.tz.setDefault(timezone);


  const fiveHoursOutput =  nextFiveHoursArr.map(nextHour => {
    const time = moment.unix(nextHour.dt).format('ha');
    const hourDataPropObj = {
      time,
      description: nextHour.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${nextHour.weather[0].icon}.png`,
      temp: Math.round((nextHour.temp)),
      feelsLike: Math.round( nextHour.feels_like),
      wind: Math.round(nextHour.wind_speed)
    }
    return <NextSingleHour {...hourDataPropObj}
    key={nextHour.dt} />
  })

  return (
    <Row className="next-hours-weather" md={8}>
   {fiveHoursOutput}
    </Row>
  )
}