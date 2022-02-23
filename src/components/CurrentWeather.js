import { Button, Container, Row, Col, Image } from 'react-bootstrap';

export default function (props) {
  return (
    <Row className="today-container" md={8}>
      <Col md={4}>
        <Row md={5}>City {props.city}</Row>
        <Row md={5}>{props.currentTemp}</Row>
      </Col>
      <Col md={3}>
      <Image src={`http://openweathermap.org/img/wn/${props.iconUrl}.png`}>

      </Image>
      </Col>
      <Col md={3}>
        <Row md={4}>High {props.highTemp}</Row>
        <Row md={4}>Low {props.lowTemp}</Row>
      </Col>
    </Row>
  )

}