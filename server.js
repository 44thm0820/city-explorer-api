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

//our most basic route. hit by going to http://localhost:3002
app.get('/', (request, response) => {
  response.send('Hello, From our Server!');
});

// hit route by going to http://localhost:3002/banana
app.get('/banana', (request, response) => {
  response.send('mmmm, bananas!');
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
  response.status(200).send(`Hello ${name}, from the Server`);

});



// catch all route MUST BE the last route in the file
// we can control the messaging for any mistakenly hit route that doesn't exist
app.get('*', (request, response) => {
  response.status(404).send('these are not the droids you are looking for...');
});


// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));