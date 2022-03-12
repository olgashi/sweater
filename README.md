## Sweater
### Weather forecast application (React, React Bootstrap, localforage)
[Deployed APP](https://sweater-weatherapp.herokuapp.com/)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/41551585/157994093-cf7749f8-b5ee-433c-b474-3a9e79ad4292.gif)

Allows to view:
- current
- 5 hour 
- 7 day forecast 

for a chosen location.


To view the weather forecast, simply start typing in the name of the city or region in the search bar. Up to 10 suggestions will be prepoulated in the dropdown. Once one of the suggestions is clicked followed by a click on 'Get Weather' button, the page will update with the new weather data.

The application caches the weather result to minimize number of API calls. If the previously fetched data is less than 10 miniutes old, application will use the cached data to display the forecast. Otherwise, the new data is fatched, displayed and stored in the cache.

