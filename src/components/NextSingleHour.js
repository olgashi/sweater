import { Row, Col, Image } from 'react-bootstrap';

export default function NextSingleHour (props) {
  return (
      <Col>
        <Row md={5}>Time {props.time}</Row>
        <Image src={props.iconUrl} />
        <Row md={4}>{props.description}</Row>
        <Row md={4}>Temp {props.temp}</Row>
      </Col>
  )
}