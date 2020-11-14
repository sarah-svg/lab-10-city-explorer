
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

function mungeTrail(hiking) {
  return hiking.data.map(item => {
    return {       

      name: item.name,
      location: item.location,
      length: item.length,
      stars: item.stars, 
      star_votes: item.starVotes,
      summary: item.summary, 
      trail_url: item.trailUrl,
      conditions: item.conditions, 
      conditionStatus: item.conditionStatus,
      conditionDetails: item.conditionDetails,
      conditionDate: item.conditionDate,
          

    };
  }).slice(0, 8);
}





module.exports = { mungeLocation, mungeWeather, mungeTrail, mungeYelp };
