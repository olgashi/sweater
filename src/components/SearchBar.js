import React from "react";
import { Row, Col } from "react-bootstrap";
import Autocomplete from "./Autocomplete";

export default function SearchBar(props) {
  return (
    <Row>
      <Col md={8}>
        <Autocomplete className="searchbar" buttonOnClick={props.handleClick} />
      </Col>

      <Col md={4}>
        <div>
          <img
            src={require("../images/logo5.png")}
            className="logo"
            alt="Sweater Weather App logo"
          ></img>
        </div>
      </Col>
    </Row>
  );
}
