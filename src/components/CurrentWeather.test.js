import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";
import weatherData from "../../__mocks__/mock-data.js";
import userData from "../../__mocks__/mock-data-user-location.js";

const weatherDataObj = {
  timezone: weatherData.timezone,
  weatherCurrent: weatherData.current,
  weatherToday: weatherData.daily[0],
  weatherHourly: weatherData.hourly,
  weatherDaily: weatherData.daily,
};

test("renders Current Weather", () => {
  render(
    <CurrentWeather userLocation={userData} weatherData={weatherDataObj} />
  );

  const element = screen.getByText("Chicago, Illinois", { exact: false });
  expect(element).toBeDefined();
});
