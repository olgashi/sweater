import React, { Component, Fragment } from "react";
import axios from 'axios';
import env from "react-dotenv";

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
      city: '',
      region: '',
      country: ''
    };
  }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.getSuggestionsFromAPI(e.target.value.trim())
  
      this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput: e.currentTarget.value
      });
    };

    onClick = (e: React.MouseEvent<HTMLElement>) => {
      const eventTarget = e.target;
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
        lat: eventTarget.getAttribute('lat'),
        lon: eventTarget.getAttribute('lon'),
        city: eventTarget.getAttribute('city'),
        region: eventTarget.getAttribute('region'),
        country: eventTarget.getAttribute('country')
      });
    };

    onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      const { activeSuggestion, filteredSuggestions } = this.state;
  
      if (e.keyCode === 13) {
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion].name
        });
      } else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }
        this.setState({ activeSuggestion: activeSuggestion - 1 });
      }
      // User pressed the down arrow, increment the index
      else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
        this.setState({ activeSuggestion: activeSuggestion + 1 });
      }
    };

    getSuggestionsFromAPI() {
      
      if (this.state.APICallTimer) {
        clearTimeout(this.state.APICallTimer);
        this.setState({
          APICallTimer: null
        })
      } else if (this.state.userInput) {
        const timer = setTimeout(() => {
          const queryString = this.state.userInput;
          const url = `https://api.weatherapi.com/v1/search.json?key=${env.WEATHER_API_TOKEN}&q=${queryString}`;
  

          axios.get(url).then(data => {
            this.setState({
              APICallTimer: null,
              filteredSuggestions: data.data
            })
            console.log(data)
          }
            ).catch(error => console.log(error));
        }, 300);

        this.setState({ APICallTimer: timer })
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
          region
        }
      } = this;
  
      let suggestionsListComponent;
      const noSearchResultsMessageElement = document.querySelector(".no-search-results-message");

      if (showSuggestions && userInput) {
        noSearchResultsMessageElement.innerHTML = '';
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="suggestions md-5">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
  
                // Flag the active suggestion with a class
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
                  country={suggestion.country}>
                    {suggestion.name}, {suggestion.region}, {suggestion.country}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          noSearchResultsMessageElement.innerHTML = '<em>Please enter City or Country name</em>';
        }
      }


    
    return (
      <Fragment>
        <input
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
      </Fragment>
    );
  }
}

export default Autocomplete;
