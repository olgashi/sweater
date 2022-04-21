import React from "react";
import { Row } from "react-bootstrap";
import NextSingleHour from "./NextSingleHour";
import { generateHourlyWeatherDataObj } from "../utils/general-utils";
import { NUM_HOURS_TO_DISPLAY } from "../utils/const-utils";
const moment = require("moment-timezone");

export default function NextHoursContainer(props) {
  const { weatherHourly, timeZone } = props;

  moment.tz.setDefault(timeZone);

  const fiveHoursOutput = weatherHourly
    .slice(0, NUM_HOURS_TO_DISPLAY)
    .map((nextHourDataObj) => {
      const time = moment.unix(nextHourDataObj.dt).format("ha");

      return (
        <NextSingleHour
          {...generateHourlyWeatherDataObj({ nextHourDataObj, time })}
          key={nextHourDataObj.dt}
        />
      );
    });

  return (
    <Row className="next-hours-weather" md={8}>
      {fiveHoursOutput}
    </Row>
  );
}
