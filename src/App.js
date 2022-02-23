import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import publicIp from 'public-ip';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userIP: '',
      weatherFetchedTimestamp: null,
      weatherJSON: [],
      userZip: '',
      userCity: '',
      initialLocation: null,
    }
  }

  getUserLocationData = async () => {
    const responseIP = await publicIp.v4();
    this.setState({ userIP: responseIP });
    await axios.get(`https://ipinfo.io?token=b1ca041c2a1875`).then(responseLocation => responseLocation.data).then((data) => {
      console.log(data)
      this.setState({ userZip: data.postal });
      this.setState({ userCity: data.city });
      this.setState({ initialLocation: true })
    }).catch(error => {
      this.setState({ initialLocation: false })
      console.log(error);
    })

  }
  getUserLocation = async () => {

  }

  componentDidMount() {
    this.getUserLocationData();

  }
  render() {
    return (
      <div className="App">
        {this.state.initialLocation ?
          <div>
            <h2>Your IP Address is</h2>
            <h4>{this.state.userIP}</h4>
            <h2>{this.state.userCity}</h2>
            <h2>{this.state.userZip}</h2>
          </div>
      : <p>
      Your location wasnt determined.
    </p>
  }
      </div>
    )
  }
}

export default App;
