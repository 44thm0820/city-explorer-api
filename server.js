'use strict';

console.log('Hello World, From our FIRST Server!!');

const { response } = require('express');
// in our servers, we MUST use require instead of import
// must bring express - justhow we do it. see docs for questions
const express = require('express');

// how it works - see docs
const app = express();

// middleware if necessary goes here AFTER app has been instantiated

const PORT = 3002;

//require weather placeholder json today, will hit live weather API's json tomorrow
const weatherData = require('./data/weather.json');

//our most basic route. hit by going to http://localhost:3002
app.get('/', (request, response) => {
  response.send('Hello, From line 19, our Server!'); // renders to browser
});

/* // hit route by going to http://localhost:3002/banana
app.get('/banana', (request, response) => {
  response.send('mmmm, bananas!'); // renders to browser
});

//insert code from 02:09:00 mark
// to hit this route: http://localhost:3002/sayHello?name=Ryan
app.get('/sayHello', (request, response) => {
  // we access query parameters using the request object
  // specifically: request.<parameter-name>
  let name = request.query.name;

  // notice we can get proof of life. LOGS show IN TERMINAL
  // console.log(request.query);
  // console.log(name);
  response.status(200).send(`Hello ${name}, from the Server`); //renders to browser

}); */

/* //to hit this route:http://localhost:3002/throw-an-error

app.get(’/throw-an-error’, (request, response)⇒ {

  throw ‘You did something  really really bad!’;//for critical errors like sledgehammer

})

//no validation is drawback */

//above-some useful things
// ______

//create route ‘/pets’ your will be ‘/weather’ that uses json to send a tailored response

// hit this route: http://localhost:3002/pets? species=dog
// hit this route: http://localhost:3002/weather? city_name=Seattle

app.get('/weather', (request,response) => {

  let city_name = request.query.city_name;

  //gives proof of life in the TERMINAL

  console.log(city_name);

  response.send(weatherData.filter(city => city.city_name === city_name)[0].data.map(dataDay => new Forecast(dataDay)));  //chained!!! 

  // output

})


// catch all route MUST BE the last route in the file
// we can control the messaging for any mistakenly hit route that doesn't exist
app.get('*', (request, response) => {
  response.status(404).send('these are not the droids you are looking for...');
});

// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//we can declare this class below it being called due to automatic hoisting in JavaScript
class Forecast {
  constructor(dataDay) {
    // this.low = dataDay.low_temp;
    // this.high = dataDay.high_temp;
    // this.description = dataDay.weather.description; 
    this.description = `Low of ${dataDay.low_temp}, high of ${dataDay.high_temp} with ${dataDay.weather.description.toLowerCase()}`;
    this.date = dataDay.valid_date;
  }
}