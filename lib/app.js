
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { mungeLocation } = require('../utils.js');
const request = require('superagent');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());




app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.location}&format=json`;
    const response = await request.get(URL);
    console.log(response.body);
    const newResponse = mungeLocation(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});
// app.get('/', async(req, res) => {
//   try {
//     const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&${req.query.q}.543&key={process.env.WEATHER_KEY}`;
//     const response = await request.get(URL);
//     console.log(response.body);
//     const newResponse = mungeLocation(response.body);

//     res.json(newResponse);
//   } catch(e) {
//     res.json({ error: e.message });
//   }
// });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
