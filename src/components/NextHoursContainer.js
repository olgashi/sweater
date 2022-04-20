import React from 'react';
import { Row } from 'react-bootstrap';
import NextSingleHour from './NextSingleHour';
import { generateHourlyWeatherDataObj } from '../utils/general-utils';
import { NUM_HOURS_TO_DISPLAY } from '../utils/const-utils';
const moment = require('moment-timezone');

export default function NextHoursContainer(props) {
  const { hourly, timezone } = props;

  moment.tz.setDefault(timezone);

  const fiveHoursOutput =  hourly.slice(0, NUM_HOURS_TO_DISPLAY).map(nextHour => {
    const time = moment.unix(nextHour.dt).format('ha');

    return <NextSingleHour {...generateHourlyWeatherDataObj({ nextHour, time })}
    key={nextHour.dt} />
  })

  return (
    <Row className="next-hours-weather" md={8}>
   {fiveHoursOutput}
    </Row>
  )
}