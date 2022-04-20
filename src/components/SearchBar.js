import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Autocomplete from './Autocomplete';

export default function SearchBar(props) {
  return (
    <Row>
        <Col md={8}>
        <Autocomplete className="searchbar" buttonOnClick={props.handleClick}/>
        </Col>
      
      <Col md={4}>
      <div>
        <img src={require('../images/logo5.png')} className="logo"></img>
      </div>
      </Col>
    </Row>
  )
}