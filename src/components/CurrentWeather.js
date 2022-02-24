import { Button, Container, Row, Col, Image } from 'react-bootstrap';

export default function (props) {
  return (
    <Row className="today-container" md={8}>
      <Col md={4}>
        <Row md={5}>{props.city}, {props.state}</Row>
        <Row md={5} className="temp-weather">{props.currentTemp} F</Row>
      </Col>
      <Col md={3}>
      <Image src={`http://openweathermap.org/img/wn/${props.iconUrl}.png`}>

      </Image>
      </Col>
      <Col md={3}>
        <Row md={4}>High {Math.round(props.highTemp)} F</Row>
        <Row md={4}>Low {Math.round(props.lowTemp)} F</Row>
      </Col>
    </Row>
  )

}