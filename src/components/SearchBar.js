import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Autocomplete from './Autocomplete';

export default function SearchBar(props) {
  return (
    <Row>
        <Col md={3}>
        <Autocomplete className="searchbar"/>
        </Col>
        <Col md={3}>
        <Button variant="outline-secondary" onClick={props.handleClick} className="searchbar button">
          Get Weather
        </Button>
      </Col>
      
      <Col md={6}>
      <div>
        <img src={require('../images/logo5.png')} className="logo"></img>
      </div>
      </Col>
    </Row>
  )
}