import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import NextHoursContainer from "./NextHoursContainer";
import weatherData from "../../__mocks__/mock-data.js";

test("renders NextHoursContainer", () => {
  render(
    <NextHoursContainer
      weatherHourly={weatherData.hourly}
      timeZone={weatherData.timezone}
    />
  );
  const feelsLikeTextElement = screen.getAllByText("Feels Like", {
    exact: false,
  });
  const windTextElement = screen.getByText("Wind: 15 mph", { exact: false });
  const tempTextElement = screen.getAllByText("F", { exact: false });
  const specificTempTextElement = screen.getAllByText("48 F", { exact: false });
  const specificTimeTextElement = screen.getByText("3pm", { exact: false });

  expect(feelsLikeTextElement).toHaveLength(5);
  expect(windTextElement).toBeDefined();
  expect(tempTextElement.length === 10).toBeTruthy();
  expect(specificTempTextElement).toBeDefined();
  expect(specificTimeTextElement).toBeDefined();
});
