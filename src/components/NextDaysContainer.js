import { Row, Col, Image, Container } from 'react-bootstrap';
import NextSingleDay from './NextSingleDay';

export default function NextDaysContainer(props) {
  const nextThreeDaysArr = props.daily.slice(0, 3);
  const threeDaysOutput =  nextThreeDaysArr.map(nextDay => {
    // console.log(nextDay);
    return <NextSingleDay 
    key={nextDay.dt} 
    date={nextDay.dt} 
    iconUrl={`http://openweathermap.org/img/wn/${nextDay.weather[0].icon}.png`} 
    tempLow={nextDay.temp.min}
    tempHigh={nextDay.temp.max} 
    description={nextDay.weather[0].description}/>
  })


  return (
    <Container className="next-days-weather" md={8}>
   {threeDaysOutput}
    </Container>
  )
}