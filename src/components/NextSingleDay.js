import { Row, Col, Image } from 'react-bootstrap';

export default function NextSingleDay (props) {
  return (
      <Row className="single-day-weather">
        <Col md={3}>{props.day}</Col>
        <Col md={4}>
        <img width="50" height="50" src={props.iconUrl} />
        </Col>
        <Col md={3}>Description {props.description}</Col>
        <Col md={2}>Temp Low/High {props.tempLow}/{props.tempHigh}</Col>
      </Row>
  )
}