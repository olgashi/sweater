## Sweater - Weather forecast application  <img width="55" src="https://user-images.githubusercontent.com/41551585/164777612-1494781c-9d30-432f-aa82-d46bbdc40b51.png"/>
:sunny:	:umbrella:	:cloud: :snowflake:	:snowman: :zap:
:cyclone:	:foggy:	:sun_with_face: :partly_sunny:

## Built with: React, localforage, JavaScript, ipinfo.io API, OpenWeather API, Weather API

<div align="center">
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/react.svg"/>
  <img width="55" src="https://user-images.githubusercontent.com/41551585/164792482-505c9156-74df-49b4-adf1-038cb897b393.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/bootstrap.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/eslint.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/jest.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/momentjs.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/nodejs.svg"/>
  <img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/prettier.svg"/>
  <img width="55" src="https://user-images.githubusercontent.com/41551585/164776636-a6847e3f-3c21-47c7-a725-e6ff78e655d2.svg"/>
  <img width="55" src="https://user-images.githubusercontent.com/41551585/164776413-6b15a88f-d753-492a-8517-65f639bc874b.svg"/>
  <img width="55" src="https://user-images.githubusercontent.com/41551585/164788716-37f8ea00-3e0e-4b12-900e-6dacb31a0a18.svg"/>

</div>

[See Deployed APP here](https://sweater-weatherapp.herokuapp.com/)

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/41551585/164791091-cd10e502-669c-426f-bb4b-41c0a8b04ea0.gif)

### Overview

**Sweater** allows user to view current, 5 hour, 7 day weather forecast for a specified location. 

By default the app tries to determine user location based on their IP and then displays relevant weather. It won't be able to do it in certain cases, for example, if the user has adblockers enabled. It is recommended to use Chrome or Firefox for the best experience.

To view the weather forecast for a specific location, user can simply start typing in the name of the city or region in the search bar. As the user types in the location, the app sends a request to Weather API, specifically to its Search/Autocomplete API service (you can learn more about it [here](https://www.weatherapi.com/docs/)). 
Once the API responce is recieved, 10 suggestions are generated. The user can scroll through the suggestions and pick the one that most closely matches their query. 

<img width="600" alt="dropdown" src="https://user-images.githubusercontent.com/41551585/164789985-c73a96e4-cf26-41db-a9ce-1b7367bc9229.gif">

After the user picks one of the suggestions and then clicks the **Get Weather** button, the apppplication then sends an API request to OpenWeather API (to be more specific it makes a request to its [One Call API 1.0 resource](https://openweathermap.org/api/one-call-api)).

### Data caching
The application caches the weather result to minimize number of API calls made. **localfrage** is used as a caching solution. Read more about localforage [here](https://localforage.github.io/localForage/)

#### Overview of caching process

#### User looks up weather for a specific location for the first time:

![Blank diagram (1)](https://user-images.githubusercontent.com/41551585/164791879-1f8c969d-6dfb-40b3-8fd0-ed608516ceb8.png)


#### User had previously requested weather for that same location (some steps are omitted for brevity):

![Copy of Blank diagram](https://user-images.githubusercontent.com/41551585/164786055-19e55b85-7a64-43e0-9e56-9244f3465d23.png)


[![Node.js CI](https://github.com/olgashi/sweater/actions/workflows/node.js.yml/badge.svg)](https://github.com/olgashi/sweater/actions/workflows/node.js.yml)
