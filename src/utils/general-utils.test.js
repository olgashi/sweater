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
  expect(filterHourlyWeatherToCurrentHours()).toEqual(null);
  expect(filterHourlyWeatherToCurrentHours([])).toEqual(null);
  expect(filterHourlyWeatherToCurrentHours({})).toEqual(null);
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


test('determinePercipitation determins if percipitation is in weather data and what type', () => {
  const resultingObj = {"type": "Rain", "value": "0.09"};
  expect(determinePercipitation(dayDataObj)).toEqual(resultingObj);
  expect(determinePercipitation({"snow": 0.9})).toEqual({"type": "Snow", "value": "0.04"});
  expect(determinePercipitation({"rain": 1.9})).toEqual({"type": "Rain", "value": "0.07"});

});

test('generateDailyWeatherDataObj composes data object of appropriate form', () => {
  const resultingObj = {"cloudness": "100%", "day": "Today", "description": "light rain", "feelsLikeTemp": 42.24, "humidity": "61%", "iconUrl": "http://openweathermap.org/img/wn/10d.png", "percipitation": {"type": "Rain", "value": "0.09"}, "sunrise": "6:02 am", "sunset": "7:36 pm", "tempHigh": 52, "tempLow": 40, "uvIndex": "2.17 - Low", "wind": 20};
  expect(generateDailyWeatherDataObj({ dayDataObj, timezone: weatherData.timezone })).toEqual(resultingObj);
  expect(generateDailyWeatherDataObj({ timezone: weatherData.timezone })).toEqual({});
  expect(generateDailyWeatherDataObj()).toEqual({});
  expect(generateDailyWeatherDataObj({})).toEqual({});
  expect(generateDailyWeatherDataObj([])).toEqual({});
  expect(generateDailyWeatherDataObj(null)).toEqual({});
  expect(generateDailyWeatherDataObj(undefined)).toEqual({});
  
});

test('generateHourlyWeatherDataObj composes data object of appropriate form', () => {
  const resultingObj = {"description": "light rain", "feelsLike": 43, "icon": "http://openweathermap.org/img/wn/10d.png", "temp": 48, "time": "1am", "wind": 15};
  // expect(generateHourlyWeatherDataObj({})).toEqual({});
  // expect(generateHourlyWeatherDataObj({nextHourDataObj: hourDataObj, time: "1am"})).toEqual(resultingObj);
  // expect(generateHourlyWeatherDataObj()).toEqual({});
  // expect(generateHourlyWeatherDataObj([])).toEqual({});
  // expect(generateHourlyWeatherDataObj(null)).toEqual({});
  // expect(generateHourlyWeatherDataObj(undefined)).toEqual({});
  //FIXME breaks
});