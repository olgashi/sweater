import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import CurrentWeatherHeader from "./CurrentWeatherHeader";
import weatherData from "../../__mocks__/mock-data.js";
import useDate from "../custom-hooks/useDate";

test("renders Current Weather Header", () => {
  render(
    <CurrentWeatherHeader dateHook={useDate} timezone={weatherData.timezone} />
  );
  const element = screen.getByText("Weather as of", { exact: false });
  expect(element).toBeDefined();
});
