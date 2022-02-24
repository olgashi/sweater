import { Row, Col, Image } from 'react-bootstrap';

export default function NextSingleDay (props) {
  return (
      <Row className="single-day-weather">
        <Col md={3} className="weekday-weather">{props.day}</Col>
        <Col md={4}>
        <img width="50" height="50" src={props.iconUrl} />
        </Col>
        <Col md={3} className="description-weather">{props.description}</Col>
        <Col md={2}>
        <Row className="low-high-weather"><span>
        Low/High
        </span>
        </Row>
        <Row>
        <span className="temp-weather">
        {Math.round(props.tempLow)}/
        {Math.round(props.tempHigh)} F
        </span>
        </Row>
        </Col>
      </Row>
  )
}