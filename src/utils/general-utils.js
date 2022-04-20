import { INCHES_IN_MM } from './const-utils';
import { convertToWeekDayShort } from './date-utils';
import { determineUVSevereness } from './text-utils';

const moment = require('moment');
require('moment-timezone');

export function filterHourlyWeatherToCurrentHours(weatherDataArr, userLocData) {
  moment.tz.setDefault(userLocData.timezone);
  let now = moment();

  return weatherDataArr.filter(el => {
    let day = moment.unix(el.dt);
    if (now <= day) {
      return el;
    }
  })
}

export function getAlerts(weatherData) {
  if (weatherData.alerts) {
    return weatherData.alerts.map(alert => alert.description).filter(el => el).join(', ')
  }
  return null
}

export function getLocationLookupDataFromInput(elementId) {
  const inputElement = document.getElementById(elementId)
  const userSearchInput = inputElement.value;
  const lat = inputElement.getAttribute('lat');
  const lon = inputElement.getAttribute('lon');
  const city = inputElement.getAttribute('city');
  const region = inputElement.getAttribute('region');
  const country = inputElement.getAttribute('country');

  return { userSearchInput, lat, lon, city, region, country };
}

export function determinePercipitation(dayDataObj) {
  let percipitation = null;
  if (dayDataObj.hasOwnProperty('snow')) {
    percipitation = { type: 'Snow', value: (parseFloat(dayDataObj.snow) * INCHES_IN_MM).toFixed(2)};
  } else if (dayDataObj.hasOwnProperty('rain')) {
    percipitation =  { type: 'Rain', value: (parseFloat(dayDataObj.rain) * INCHES_IN_MM).toFixed(2)};
  }
  return percipitation;
}

export function generateDailyWeatherDataObj({ dayDataObj, timezone }) {
  return {
    day: convertToWeekDayShort(dayDataObj.dt, timezone),
    description: dayDataObj.weather[0].description,
    tempLow: Math.round(dayDataObj.temp.min),
    tempHigh: Math.round(dayDataObj.temp.max),
    iconUrl: `http://openweathermap.org/img/wn/${dayDataObj.weather[0].icon}.png`,
    feelsLikeTemp: dayDataObj.feels_like.day, // TODO should be assigned conditionally based on the time of the day
    humidity: `${dayDataObj.humidity}%`,
    sunrise: moment.unix(dayDataObj.sunrise).format('h:mm a'),
    sunset: moment.unix(dayDataObj.sunset).format('h:mm a'),
    wind: Math.round(dayDataObj.wind_speed),
    cloudness: `${dayDataObj.clouds}%`,
    uvIndex: `${dayDataObj.uvi} - ${determineUVSevereness(dayDataObj.uvi)}`,
    percipitation: determinePercipitation(dayDataObj),
  };
}

export function generateHourlyWeatherDataObj({ nextHourDataObj, time }) {
  return {
    time,
    description: nextHourDataObj.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${nextHourDataObj.weather[0].icon}.png`,
    temp: Math.round((nextHourDataObj.temp)),
    feelsLike: Math.round( nextHourDataObj.feels_like),
    wind: Math.round(nextHourDataObj.wind_speed)
  }
}