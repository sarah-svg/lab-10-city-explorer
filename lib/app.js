require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { mungeLocation, mungeWeather, mungeYelp, mungeTrail } = require('../utils.js');
//const port = process.env.PORT || 7890;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});
console.log(process.env.LOCATION_KEY);
app.get('/location', async(req, res) => {
  try {
    //const URL =  'https://us1.locationiq.com/v1/search.php?key=pk.d51d8ef8a80d0a317f07a6daa55aedd2&q={summertown,tn}&format=json';
    const URL =  `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.q}&format=json`;
    // const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.params.location}&format=json`;
    console.log(URL);
    const response = await request.get(URL);

    const newResponse = mungeLocation(response.body);
    console.log(newResponse);
    res.json(newResponse);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});
console.log(process.env.WEATHER_KEY);
/////////////////////////


/////////////////////////////////////////////////////////////////
app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;
    const response = await request.get(URL);
    const newResponse = mungeWeather(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});
////////////////////////

console.log(process.env.HIKING_KEY);

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`;

    const response = await request.get(URL);
   
    const newResponse = mungeTrail(response.body.trails);

    res.json (newResponse);
 console.log(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});


///////////////////////////////////////////////

app.get('/reviews', async(req, res) => {
  console.log(process.env.YELP_KEY);
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.lat}&longitude=${req.query.longitude}`;
    console.log(URL);
    const response = await request.get(URL).set({ 'Authorization': `Bearer ${process.env.YELP_KEY}` });

    const mungResponse = mungeYelp(response.body);

    res.json(mungResponse);
    console.log(mungResponse);
  } catch(e) {
    res.json({ error: e.message });
    res.status(500);
  }
});







app.use(require('./middleware/error'));




module.exports = app;


