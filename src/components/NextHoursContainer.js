import { Row, Col, Image } from 'react-bootstrap';
import NextSingleHour from './NextSingleHour';
import { amPm } from '../utils/date-utils';

export default function NextHoursContainer(props) {
  const nextFiveHoursArr = props.hourly.slice(0, 5);
  const fiveHoursOutput =  nextFiveHoursArr.map(nextHour => {
    //FIXME hour is wrong

    return <NextSingleHour key={nextHour.dt} time={amPm(nextHour.dt)} iconUrl={`http://openweathermap.org/img/wn/${nextHour.weather[0].icon}.png`} temp={nextHour.temp} description={nextHour.weather[0].description}/>
  })


  return (
    <Row className="next-hours-weather" md={8}>
   {fiveHoursOutput}
    </Row>
  )
}