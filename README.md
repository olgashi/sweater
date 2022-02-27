## Sweater
[Deployed APP](https://sweater-weatherapp.herokuapp.com/)

## Weather forecast application (React, React Bootstrap, localforage)

Allows to view:
- current
- 5 hour 
- 7 day forecast 

for a chosen location.


To view the weather forecast, simply start typing in the name of the city or region in the search bar. Up to 10 suggestions will be prepoulated in the dropdown. Once one of the suggestions is clicked followed by a click on 'Get Weather' button, the page will update with the new weather data.

The application caches the weather result to minimize number of API calls. If the previously fetched data is less than 10 miniutes old, application will use the cached data to display the forecast. Otherwise, the new data is fatched, displayed and stored in the cache.



![](https://github.com/olgashi/sweater/blob/master/sweater-2.png)

![](https://github.com/olgashi/sweater/blob/master/sweater-3.png)

![](https://github.com/olgashi/sweater/blob/master/sweater-1.png)

![](https://github.com/olgashi/sweater/blob/master/sweater-5.png)

