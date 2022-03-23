## Sweater
### Weather forecast application (React, React Bootstrap, localforage)
[Deployed APP](https://sweater-weatherapp.herokuapp.com/)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/41551585/157994093-cf7749f8-b5ee-433c-b474-3a9e79ad4292.gif)

**Sweater** allows user to view current, 5 hour, 7 day weather forecast based on their IP address. By default the app tries to determine user location right away and then displays relevant weather (it won't be able to do some in certain cases, for example, if the user has adblockers enabled).

To view the weather forecast for a specific location, user can simply start typing in the name of the city or region in the search bar. Up to 10 suggestions will be prepoulated in the dropdown. Once one of the suggestions is clicked followed by a click on 'Get Weather' button, the page will update without a refresh and dsiplay the new weather data.

The application caches the weather result to minimize number of API calls. 

If a user had previously requested weather for and the data is less than 10 miniutes old (because weather data updates no less than every 10 minutes) application will use the cached data to display the forecast.

If the user had not previously requested weather for the requested location or the existing/cached data is over 10 minutes old, Sweater will make a new request to get the weather data, which is then displayed to the user and also stored in the cache for later use. The app uses localforage as a caching solution. 

TODO:
- Split into front end and back end apps, deployed individually
- Finish Typescript refactor
- Convert remaining class components into functional components
- Fix the input field (doesnt clear when user clicks 'Get Weather')
- Add tests (unit, ent-to-end - Cypress, jest)
- Dockerize
- Deploy to AWS
- Set up CI/CD pipeline
