import React from 'react';
import { Container } from 'react-bootstrap';
import NextSingleDay from './NextSingleDay';
import { convertToWeekDayShort } from '../utils/date-utils';
import { determineUVSevereness } from '../utils/text-utils';
import { INCHES_IN_MM } from '../utils/const-utils';
const moment = require('moment-timezone');
// TODO cleanup this component
export default function NextDaysContainer(props) {
  const timezone = props.timeZone;
  moment.tz.setDefault(timezone);
  const dayWeatherArr = props.daily.slice(0, props.numDays);
  // TODO should be extracted to a function: (parseFloat(dayData.snow) * INCHES_IN_MM).toFixed(2)}
  const allDaysOutput =  dayWeatherArr.map(dayData => {
    let percipitation = null;
    if (dayData.hasOwnProperty('snow')) {
      percipitation = { type: 'Snow', value: (parseFloat(dayData.snow) * INCHES_IN_MM).toFixed(2)};
    } else if (dayData.hasOwnProperty('rain')) {
      percipitation =  { type: 'Rain', value: (parseFloat(dayData.rain) * INCHES_IN_MM).toFixed(2)};
    }

    // TODO any way to clean this up? very messy..
    const dayDataPropObj = {
      day: convertToWeekDayShort(dayData.dt, timezone),
      description: dayData.weather[0].description,
      tempLow: Math.round(dayData.temp.min),
      tempHigh: Math.round(dayData.temp.max),
      iconUrl: `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`,
      feelsLikeTemp: dayData.feels_like.day, // TODO should be assigned conditionally based on the time of the day
      humidity: `${dayData.humidity}%`,
      sunrise: moment.unix(dayData.sunrise).format('h:mm a'),
      sunset: moment.unix(dayData.sunset).format('h:mm a'),
      wind: Math.round(dayData.wind_speed),
      cloudness: `${dayData.clouds}%`,
      uvIndex: `${dayData.uvi} - ${determineUVSevereness(dayData.uvi)}`,
      percipitation
    };

    return <NextSingleDay {...dayDataPropObj}
    key={dayData.dt} 
    />
  })

  return (
    <Container className="next-days-weather" md={8}>
   {allDaysOutput}
    </Container>
  )
}