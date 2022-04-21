import React from "react";

export default function CurrentWeatherHeader(props) {
  const { dateHook, timezone } = props;
  const { dateTime } = dateHook(timezone);
  return <h2 className="current-weather-header">Weather as of {dateTime}</h2>;
}
