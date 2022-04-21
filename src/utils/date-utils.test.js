import { convertToWeekDayShort } from "./date-utils";

const timezone = "America/Chicago";
const moment = require("moment-timezone");
moment.tz.setDefault(timezone);
const Today = moment().unix();
const dateMonday = 1650263287;
const dateTuesday = 1650349687;
const dateWednesday = 1650436087;
const dateThursday = 1649917687;
const dateFriday = 1650004087;
const dateSaturday = 1650090487;
const dateSunday = 1650176887;

test("convertToWeekDayShort converts unix timestamp to a three letter day of the week", () => {
  expect(convertToWeekDayShort(Today, timezone)).toEqual("Today");
  expect(convertToWeekDayShort(dateMonday, timezone)).toEqual("Mon");
  expect(convertToWeekDayShort(dateTuesday, timezone)).toEqual("Tue");
  expect(convertToWeekDayShort(dateWednesday, timezone)).toEqual("Wed");
  expect(convertToWeekDayShort(dateThursday, timezone)).toEqual("Thu");
  expect(convertToWeekDayShort(dateFriday, timezone)).toEqual("Fri");
  expect(convertToWeekDayShort(dateSaturday, timezone)).toEqual("Sat");
  expect(convertToWeekDayShort(dateSunday, timezone)).toEqual("Sun");
});
test("convertToWeekDayShort returns empty string of arguments are invalid", () => {
  expect(convertToWeekDayShort()).toEqual("");
  expect(convertToWeekDayShort(undefined, undefined)).toEqual("");
  expect(convertToWeekDayShort(undefined, timezone)).toEqual("");
  expect(convertToWeekDayShort({}, timezone)).toEqual("");
  expect(convertToWeekDayShort([], timezone)).toEqual("");
  expect(convertToWeekDayShort("Hello World", timezone)).toEqual("");
});
