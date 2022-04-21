import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Autocomplete from './Autocomplete';

//TODO searchbar should be renamed to topBar or something similar
// TODO the button should be removed alltogether, the weather data fetching should be triggered once the user is selected the location
export default function SearchBar(props) {
  return (
    <Row>
        <Col md={8}>
        <Autocomplete className="searchbar" buttonOnClick={props.handleClick}/>
        </Col>
      
      <Col md={4}>
      <div>
        <img src={require('../images/logo5.png')} className="logo" alt="Sweater Weather App logo"></img>
      </div>
      </Col>
    </Row>
  )
}