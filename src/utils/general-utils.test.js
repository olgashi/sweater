import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MockInputField from '../../__mocks__/MockInputField'

import {
  filterHourlyWeatherToCurrentHours, 
  getAlerts, 
  getLocationLookupDataFromInput, 
  determinePercipitation, 
  generateDailyWeatherDataObj, 
  generateHourlyWeatherDataObj
} from './general-utils'

import weatherData from '../../__mocks__/mock-data'
const dayDataObj = weatherData.daily[0];
const hourDataObj = weatherData.hourly[0];

test('filterHourlyWeatherToCurrentHours filters input array to contain current hours', () => {
  const timezone = "America/Chicago";
  expect(filterHourlyWeatherToCurrentHours(undefined)).toEqual(null);
  expect(filterHourlyWeatherToCurrentHours()).toEqual(null);
  expect(filterHourlyWeatherToCurrentHours([])).toEqual(null);
  expect(filterHourlyWeatherToCurrentHours({})).toEqual(null);
  expect(Array.isArray(filterHourlyWeatherToCurrentHours(weatherData.daily,timezone))).toBeTruthy();
});

test('getAlerts determines if alerts are present and returns a string containing description', () => {
  expect(getAlerts()).toEqual("");
  expect(getAlerts([])).toEqual("");
  expect(getAlerts({})).toEqual("");
  expect(getAlerts(weatherData)).toEqual("...HEAT ADVISORY THIS EVENING...");
  expect(getAlerts({alerts: "Test Alert"})).toEqual("");
  expect(getAlerts({alerts:  [{"description": "...HEAT ADVISORY THIS EVENING...","tags": ["Extreme temperature value"]}]})).toEqual("...HEAT ADVISORY THIS EVENING...");
  expect(getAlerts({alerts:  [{"description": "","tags": ["Extreme temperature value"]}]})).toEqual("Extreme temperature value");
  
});

test('getLocationLookupDataFromInput should return an object of the expected form', () => {
  const mockOnchange = jest.fn(_ => true);
  const expectedObject = {"city": "Lambeth", "country": "United Kingdom", "lat": "51.49", "lon": "-0.12", "region": "Lambeth, Greater London", "userSearchInput": "Lambeth, Lambeth, Greater London, United Kingdom"}
  render(<MockInputField handleOnchange={mockOnchange}/>)
  expect(getLocationLookupDataFromInput("user-input-location-search")).toEqual(expectedObject)
});

test('determinePercipitation determins if percipitation is in weather data and what type', () => {
  const resultingObj = {"type": "Rain", "value": "0.09"};
  expect(determinePercipitation(dayDataObj)).toEqual(resultingObj);
  expect(determinePercipitation({"snow": 0.9})).toEqual({"type": "Snow", "value": "0.04"});
  expect(determinePercipitation({"rain": 1.9})).toEqual({"type": "Rain", "value": "0.07"});

});

test('determinePercipitation does not accept missing/invalid parameters', () => {
  expect(determinePercipitation()).toEqual({});
  expect(determinePercipitation({})).toEqual({});
});

test('generateDailyWeatherDataObj composes data object of appropriate form and has all required properties', () => {
  const generatedObj = generateDailyWeatherDataObj({ dayDataObj, timezone: weatherData.timezone })
  expect(generatedObj.hasOwnProperty("cloudness")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("day")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("description")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("feelsLikeTemp")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("humidity")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("iconUrl")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("percipitation")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("sunrise")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("sunset")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("tempHigh")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("tempLow")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("uvIndex")).toBeTruthy();
  expect(generatedObj.hasOwnProperty("wind")).toBeTruthy();
});

test('generateDailyWeatherDataObj does not accept invalid arguments', () => {
  expect(generateDailyWeatherDataObj({ timezone: weatherData.timezone })).toEqual({});
  expect(generateDailyWeatherDataObj({ dayDataObj:undefined, timezone: undefined })).toEqual({});
  expect(generateDailyWeatherDataObj()).toEqual({});
  expect(generateDailyWeatherDataObj({})).toEqual({});
  expect(generateDailyWeatherDataObj([])).toEqual({});
  expect(generateDailyWeatherDataObj(null)).toEqual({});
  expect(generateDailyWeatherDataObj(undefined)).toEqual({});
});

test('generateHourlyWeatherDataObj composes data object of appropriate form', () => {
  const resultingObj = {"description": "light rain", "feelsLike": 43, "icon": "http://openweathermap.org/img/wn/10d.png", "temp": 48, "time": "1am", "wind": 15};
  expect(generateHourlyWeatherDataObj({})).toEqual({});
  expect(generateHourlyWeatherDataObj({nextHourDataObj: hourDataObj, time: "1am"})).toEqual(resultingObj);
});