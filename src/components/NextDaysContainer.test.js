import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import NextDaysContainer from "./NextDaysContainer";
import weatherData from "../../__mocks__/mock-data.js";
const weatherDataObj = {
  timezone: weatherData.timezone,
  weatherCurrent: weatherData.current,
  weatherToday: weatherData.daily[0],
  weatherHourly: weatherData.hourly,
  weatherDaily: weatherData.daily,
};

test("renders NextDaysContainer", () => {
  render(
    <NextDaysContainer
      weatherDaily={weatherDataObj.weatherDaily}
      numDays="5"
      timezone={weatherDataObj.timezone}
    />
  );
  const lightRainForecastElement = screen.getAllByText("Light Rain", {
    exact: false,
  });
  const moderateRainForecastElement = screen.getAllByText("Moderate Rain", {
    exact: false,
  });
  const overCastCloudsForecastElement = screen.getAllByText("Overcast clouds", {
    exact: false,
  });

  expect(lightRainForecastElement).toBeDefined();
  expect(moderateRainForecastElement).toBeDefined();
  expect(overCastCloudsForecastElement).toBeDefined();
});
