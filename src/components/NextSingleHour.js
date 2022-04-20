import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';
import { allWordsToUpper } from '../utils/text-utils';

export default function NextSingleHour (props) {
  const {
    time, description, icon, temp, feelsLike, wind
  } = props;

  return (
      <Col className="single-hour-col">
        <Row md={5} className="next-hour-time">{time}</Row>
        <Col sm={4}></Col>
        <Col sm={4}>
        <Image src={icon} className="next-hour-icon"/>
        </Col>
        <Col sm={4}></Col>
        <Row md={4} className="next-hour-description">{allWordsToUpper(description)}</Row>
        <Row md={4} className="next-hour-temp">{temp} F</Row>
        <Row md={4} className="next-hour-feels-like">Feels Like: {feelsLike} F</Row>
        <Row md={4} className="next-hour-wind">Wind: {wind} mph</Row>
      </Col>
  )
}
