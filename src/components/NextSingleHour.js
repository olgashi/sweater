import { Row, Col, Image } from 'react-bootstrap';

export default function NextSingleHour (props) {
  return (
      <Col>
        <Row md={5} className="day-weather">{props.time}</Row>
        <Image src={props.iconUrl} />
        <Row md={4} className="description-weather">{props.description}</Row>
        <Row md={4} className="temp-weather">{Math.round(props.temp)} F</Row>
      </Col>
  )
}