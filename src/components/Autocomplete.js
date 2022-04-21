import React, { Component } from "react";
import axios from "axios";
import env from "react-dotenv";

import { Row, Col, Button } from "react-bootstrap";
class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      allSuggestions: [],
      APICallTimer: null,
      lat: null,
      lon: null,
      city: "",
      region: "",
      country: "",
    };

    this.handleUserSearch = this.handleUserSearch.bind(this);
  }

  onChange(e) {
    this.getSuggestionsFromAPI(e.target.value.trim());

    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  }

  onClick(e) {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      lat: e.target.getAttribute("lat"),
      lon: e.target.getAttribute("lon"),
      city: e.target.getAttribute("city"),
      region: e.target.getAttribute("region"),
      country: e.target.getAttribute("country"),
    });
  }

  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].name,
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  }

  getSuggestionsFromAPI() {
    if (this.state.APICallTimer) {
      clearTimeout(this.state.APICallTimer);
      this.setState({
        APICallTimer: null,
      });
    } else if (this.state.userInput) {
      const timer = setTimeout(() => {
        const queryString = this.state.userInput;
        const url = `https://api.weatherapi.com/v1/search.json?key=${env.WEATHER_API_TOKEN}&q=${queryString}`;

        axios
          .get(url)
          .then((data) => {
            this.setState({
              APICallTimer: null,
              filteredSuggestions: data.data,
            });
          })
          .catch((error) => console.log(error));
      }, 300);

      this.setState({ APICallTimer: timer });
    }
  }

  handleUserSearch() {
    if (this.props) {
      this.props.buttonOnClick();
      this.setState({ userInput: "" });
    }
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        lat,
        lon,
        city,
        country,
        region,
      },
    } = this;

    let suggestionsListComponent;
    const noSearchResultsMessageElement = document.querySelector(
      ".no-search-results-message"
    );

    if (showSuggestions && userInput) {
      noSearchResultsMessageElement.innerHTML = "";
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions md-5">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li
                  className={className}
                  key={suggestion.id}
                  onClick={onClick}
                  lat={suggestion.lat}
                  lon={suggestion.lon}
                  city={suggestion.name}
                  region={suggestion.region}
                  country={suggestion.country}
                >
                  {suggestion.name}, {suggestion.region}, {suggestion.country}
                </li>
              );
            })}
          </ul>
        );
      } else {
        noSearchResultsMessageElement.innerHTML =
          "<em>Please enter City or Country name</em>";
      }
    }

    return (
      <Row>
        <Col md={7}>
          <input
            placeholder="Search City, Region or Zip Code"
            className="form-control form-control-sm"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            lon={lon}
            lat={lat}
            city={city}
            region={region}
            country={country}
            id="user-input-location-search"
          />
          {suggestionsListComponent}
        </Col>
        <Col md={5}>
          <Button
            variant="outline-secondary"
            onClick={this.handleUserSearch}
            className="searchbar button"
          >
            Get Weather
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Autocomplete;
