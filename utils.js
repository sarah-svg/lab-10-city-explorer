
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
function mungeReviews(yelpData) {

  return yelpData.businesses.map(oneBusiness => {

    return {
      name: oneBusiness.name,
      image_url: oneBusiness.image_url,
      price: oneBusiness.price,
      rating: oneBusiness.rating,
      url: oneBusiness.url
    };
  });
}

function mungeTrail(trailsData) {

  return trailsData.trails.map(oneTrail => {

    return {
      name: oneTrail.name,
      location: oneTrail.location,
      length: oneTrail.length,
      stars: oneTrail.stars,
      star_votes: oneTrail.starVotes,
      summary: oneTrail.summary,
      trail_url: oneTrail.url,
      conditions: oneTrail.conditionStatus,
      condition_date: oneTrail.conditionDate,
      condition_time: 'n/a'
    };
  });
}



module.exports = { mungeLocation, mungeWeather, mungeTrail, mungeReviews };
