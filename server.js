'use strict';

console.log('Hello World, From our FIRST Server!!');

const express = require('express');

// how it works - see docs
const app = express();
const cors = require('cors');

app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const axios = require('axios');

//require weather placeholder json today, will hit live weather API's json tomorrow
const weatherData = require('./data/weather.json');


//our most basic route. hit by going to http://localhost:3001
app.get('/', (request, response) => {
  response.send('Hello, From line 19, our Server!'); // renders to browser
});

/* // hit route by going to http://localhost:3001/banana
app.get('/banana', (request, response) => {
  response.send('mmmm, bananas!'); // renders to browser
});

//insert code from 02:09:00 mark
// to hit this route: http://localhost:3001/sayHello?name=Ryan
app.get('/sayHello', (request, response) => {
  // we access query parameters using the request object
  // specifically: request.<parameter-name>
  let name = request.query.name;

  // notice we can get proof of life. LOGS show IN TERMINAL
  // console.log(request.query);
  // console.log(name);
  response.status(200).send(`Hello ${name}, from the Server`); //renders to browser

}); */

/* //to hit this route:http://localhost:3001/throw-an-error

app.get(’/throw-an-error’, (request, response)⇒ {

  throw ‘You did something  really really bad!’;//for critical errors like sledgehammer

})

//no validation is drawback */

//above-some useful things
// ______

// hit this route: http://localhost:3001/weather?searchQuery=Seattle
// hit this route: http://localhost:3001/weather?searchQuery=Paris
// hit this route: http://localhost:3001/weather?searchQuery=Amman
// hit this route: http://localhost:3001/weather?lat=47.60621&&lon=-122.33207
// hit this route: http://localhost:3001/weather?lat=47.60621&&lon=-122.33207&&searchQuery=Seattle
// hit this route: http://localhost:3001/weather?searchQuery=Endor


app.get('/weather', (request,response) => {
  let searchQuery = request.query.searchQuery; 
  let lat = request.query.lat;
  let lon = request.query.lon;

  let foundData = weatherData.find(cityData => cityData.lat === lat && cityData.lon === lon) || weatherData.find(cityData => cityData.city_name === searchQuery);
  
  if (foundData) { 
    response.send(foundData.data.map(dataDay => new Forecast(dataDay)));
  } else {
    response.status(404).send('these are not the droids you are looking for...');
  }
});

//todo lab8 tasks
// Access the query parameters from the web client request object, to identify the exact location for which the web client is requesting weather info.
// Update the callback for your `/weather` route so that, instead of returning data from the `weather.json` file, it makes a Axios request to the weather API with the latitude and longitude from the web client.

// catch all route MUST BE the last route in the file
// we can control the messaging for any mistakenly hit route that doesn't exist
app.get('*', (request, response) => {
  response.status(404).send('Error 404: these are not the droids you are looking for...');
});

//we can declare this class below it being called due to automatic hoisting in JavaScript
class Forecast {
  constructor(dataDay) {
    this.description = `Low of ${dataDay.low_temp}, high of ${dataDay.high_temp} with ${dataDay.weather.description.toLowerCase()}`;
    this.date = dataDay.valid_date;
  }
} 

// listening, aka waiting to hear specific route calls
// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
