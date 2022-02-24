import { Row, Col, Image, Container } from 'react-bootstrap';
import NextSingleDay from './NextSingleDay';

import { convertToWeekDayShort } from '../utils/date-utils';

export default function NextDaysContainer(props) {
  const dayWeatherArr = props.daily.slice(0, props.numDays);
  const allDaysOutput =  dayWeatherArr.map(nextDay => {

    return <NextSingleDay 
    key={nextDay.dt} 
    day={convertToWeekDayShort(nextDay.dt)} 
    iconUrl={`http://openweathermap.org/img/wn/${nextDay.weather[0].icon}.png`} 
    tempLow={nextDay.temp.min}
    tempHigh={nextDay.temp.max} 
    description={nextDay.weather[0].description}/>
  })


  return (
    <Container className="next-days-weather" md={8}>
   {allDaysOutput}
    </Container>
  )
}