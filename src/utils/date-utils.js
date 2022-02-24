export function convertToWeekDayShort(tmeStamp) {
  const options = { weekday: 'long' };
  return isDateToday(tmeStamp) ? 'Today' : (new Intl.DateTimeFormat('en-US', options).format(new Date(tmeStamp * 1000))).slice(0, 3);
}

export function isDateToday(tmeStamp) {
  const nowDate = new Date();
  const givenDate = new Date(tmeStamp * 1000)


  return nowDate.getFullYear() === givenDate.getFullYear()
    && nowDate.getMonth() === givenDate.getMonth()
    && nowDate.getDate() === givenDate.getDate();
}

export function getHourAmPm(tmeStamp) {
  return (new Date(tmeStamp * 1000).getHours());
}

export function amPm(tmeStamp) {
  let dte = new Date(tmeStamp * 1000);
  let hours = dte.getHours();
  let amPm = 'AM';

  if (hours >= 12) {
    hours = hours - 12;
    amPm = "PM";
  }

  if (hours === 0) {
    hours = 12;
  }

  hours = (hours).toString().padEnd('0', 2);

  return hours + amPm.toUpperCase();
}
