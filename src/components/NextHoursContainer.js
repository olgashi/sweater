import { Row, Col, Image } from 'react-bootstrap';
import NextSingleHour from './NextSingleHour';

export default function NextHoursContainer(props) {
  const nextFiveHoursArr = props.hourly.slice(0, 5);
  const fiveHoursOutput =  nextFiveHoursArr.map(nextHour => {
    // console.log(nextHour);
    return <NextSingleHour key={nextHour.dt} time={nextHour.dt} iconUrl={`http://openweathermap.org/img/wn/${nextHour.weather[0].icon}.png`} temp={nextHour.temp} description={nextHour.weather[0].description}/>
  })


  return (
    <Row className="next-hours-weather" md={8}>
   {fiveHoursOutput}
    </Row>
  )
}