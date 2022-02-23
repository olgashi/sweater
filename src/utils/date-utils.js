export function convertToWeekDayShort(tmeStamp) {
  var options = { weekday: 'long'};
  return isDateToday(tmeStamp) ? 'Today' : (new Intl.DateTimeFormat('en-US', options).format(new Date(tmeStamp * 1000))).slice(0, 3);
}

export function isDateToday(tmeStamp) {
  const nowDate = new Date();
  const givenDate = new Date(tmeStamp * 1000)
  

  return nowDate.getFullYear() === givenDate.getFullYear()
  && nowDate.getMonth() === givenDate.getMonth()
  && nowDate.getDate() === givenDate.getDate();
}

