export function convertToWeekDayShort(tmeStamp, timezone) {
  const moment = require('moment-timezone');
  if (!tmeStamp || ! timezone || !(new Date(tmeStamp)).getTime() > 0) {
    return ""
  }
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  moment.tz.setDefault(timezone);

  const now = moment();
  const convertedTimestamp = moment.unix(tmeStamp);
  const datesEqual = (now.date() === convertedTimestamp.date() &&
  now.month() === convertedTimestamp.month() &&
  now.year() === convertedTimestamp.year());

  return datesEqual ? 'Today' : weekDays[convertedTimestamp.day()].slice(0, 3);
}
