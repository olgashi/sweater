## Sweater

### Weather forecast application built with React, React Bootstrap, localforage, JavaScript, ipinfo.io (to determine user location to display relevant weather), OpenWeather API

[Deployed APP](https://sweater-weatherapp.herokuapp.com/)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/41551585/157994093-cf7749f8-b5ee-433c-b474-3a9e79ad4292.gif)

### Overview

**Sweater** allows user to view current, 5 hour, 7 day weather forecast based on their IP address. By default the app tries to determine user location right away and then displays relevant weather (it won't be able to do it in certain cases, for example, if the user has adblockers enabled).

To view the weather forecast for a specific location, user can simply start typing in the name of the city or region in the search bar. Up to 10 suggestions will be prepoulated in the dropdown. Once one of the suggestions is clicked followed by a click on 'Get Weather' button, the page will update without a refresh and dsiplay the new weather data.

[insert image here]

The application caches the weather result to minimize number of API calls. localfrage is used as a caching solution. Read more about localforage [here](https://localforage.github.io/localForage/)

**Overview of caching process**
If a user had previously requested weather for a specific location and the data is less than 10 miniutes old application gets cached data and uses it to display the forecast. Weather data updates no less than every 10 minutes (The app uses free tier OpenWeather API plan)

If the user had not previously requested weather for the requested location or the existing/cached data is over 10 minutes old, Sweater will make a new request to get the weather data. Newly fetched data is then used to display the weather forecast and it is also stored in the cache for later use.
The data is stored in cache as a key value pair, where key is lattitude and longitude (as a string) of the location and value is an object (contains current, daily, hourly weather)
TODO:

- Add better description of app architecture (including charts), include recent updates in the description
- Deploy
- Set up CI/CD pipeline

[![Node.js CI](https://github.com/olgashi/sweater/actions/workflows/node.js.yml/badge.svg)](https://github.com/olgashi/sweater/actions/workflows/node.js.yml)

Overview:

- List technologies (add images for the technologies used)
- what does the app do
- describe the flow: user opens the page, sees their weather unless there is an ad blocker enabled
- add diagrams
- explain autocomplete (gif)
- explain IP detectioon
- user may see alerts (add a gif)
- the time updates every minute: add gif, describe React hook
