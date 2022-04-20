import React from 'react';
import { Container } from 'react-bootstrap';
import NextSingleDay from './NextSingleDay';
import { generateDailyWeatherDataObj } from '../utils/general-utils'

const moment = require('moment-timezone');

export default function NextDaysContainer(props) {
  const {weatherDaily, timezone, numDays} = props;

  moment.tz.setDefault(timezone);
  const allDaysOutput =  weatherDaily.slice(0, numDays).map(dayData => {

    return <NextSingleDay {...generateDailyWeatherDataObj(dayData, timezone)}
    key={dayData.dt} 
    />
  })

  return (
    <Container className="next-days-weather" md={8}>
     {allDaysOutput}
    </Container>
  )
}