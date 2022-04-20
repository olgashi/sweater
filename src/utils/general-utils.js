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