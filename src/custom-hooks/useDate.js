import { useEffect, useState } from "react";
const moment = require("moment");
require("moment-timezone");

const useDate = (timezone) => {
  const [, setDate] = useState(moment().tz(timezone).format("h:mm a"));

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer
    };
  }, []);
  const dateTime = moment().tz(timezone).format("h:mm a");

  return {
    dateTime,
  };
};

export default useDate;
