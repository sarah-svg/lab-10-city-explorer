
const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const request = require('superagent');
const app = express();
require('dotenv').config();
// const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');
const { mungeLocation, mungeWeather, mungeReviews, mungeTrail } = require('../utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan('dev')); // http logging

// const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
// app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
// app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this proctected route, we get the user's id like so: ${req.userId}`
//   });
// });

app.get('/location', async (req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;

    const data = await request.get(URL);

    const newData = mungeLocation(data.body);

    res.json(newData);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const data = await request.get(URL);

    const newData = mungeWeather(data.body);

    res.json(newData);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/yelp', async (req, res, next) => {
  try {
    const yelpStuff = await request
      .get(`https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lng}`)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
    const yelpObject = JSON.parse(yelpStuff.text);
    const yelpBusiness = yelpObject.businesses.map(business => {
      return {
        name: business.name,
        price: business.price,
        rating: business.rating,
        url: business.url,
      };

    });
    res.json(
      yelpBusiness);
  } catch (err) {
    next(err);
  }
});
app.get('/events', async (req, res, next) => {
  try {
    const eventful = await request
      .get(`http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&where=${lat},${lng}&within=25`);
    const body = JSON.parse(eventful.text);
    console.log(body);
    const eventStuff = body.events.event.map(event => {
      return {
        link: event.url,
        name: event.title,
        date: event.start_time,
        summary: event.description,
      };
    });
    res.json(eventStuff);
  } catch(err) {
    next(err);
  }
});
app.get('/trails', async(req, res, next) => {
  try {
    const trailsData = await request
      .get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${process.env.TRAILS_KEY}`);
    const body = JSON.parse(trailsData.text);

    const trails = body.trails.map(trail => {
      return {
        name: trail.name,
        location: trail.location,
        length: trail.length,
        stars: trail.stars,
        star_votes: trail.starVotes,
        summary: trail.summary,
        trail_url: trail.url,
        conditions: trail.conditionStatus,
        condition_date: trail.conditionDate,
        condition_time: trail.conditionDate,
      };

    });
    res.json(
      trails);
  } catch (err) {
    next(err);
  }
});

app.use(require('./middleware/error'));

module.exports = app;
