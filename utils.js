
function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungeWeather(weather) {
  return weather.data.map(item => {
    return {
      forecast: item.weather.description,
      time: item.datetime
    };
  }).slice(0, 8);
}

function mungeYelp(yelp) {
  return yelp.businesses.map(item => {
    return {       
  
      name: item.name,
      image_url: item.image_url,
      price:  item.price,
      rating: item.price,
      url: item.url,
  
    };
  }).slice(0, 20);
}
function mungeTrails(trail) {
  return trail.trails.map(item => {
    return {
      name: item.name,
      location: item.location,
      length: item.length,
      stars: item.stars,
      star_votes: item.starVotes,
      summary: item.summary,
      trail_url: item.url,
      conditions: item.conditionDetails,
      condition_date: item.conditionDate.split(' ')[0],
      condition_time: item.conditionDate.split(' ')[1]
    };
  }).slice(0, 10);
}

function mungeReviews(review) {
  return review.businesses.map(item => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
  }).slice(0, 20);
}



module.exports = { mungeLocation, mungeWeather, mungeTrails, mungeReviews };
