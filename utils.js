
function mungeLocation(location) {
  console.log(location);
  console.log(location[0].display_name);
  return {

    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}


function mungeWeather(location) {

  return location.data.map(data => {
    return {
      forecast: data.weather.description,
      time: data.datetime,
    };
  }).slice(0, 8);

}





function mungeTrail(trailObj) {
  const returnArray = trailObj.trails.map(trail => {
    return {
      name: trail.name,
      location: trail.location,
      length: trail.length,
      stars: trail.stars,
      star_votes: trail.starVotes,
      summary: trail.summary,
      trail_url: trail.url,
      conditions: trail.conditionStatus,
      condition_date: trail.conditionDetails,
      condition_time: trail.conditionDate,
    };
  });

  return returnArray.slice(0, 11);
}

/////////////////////



module.exports = {
  mungeLocation,
  mungeWeather,
  mungeTrail

};

