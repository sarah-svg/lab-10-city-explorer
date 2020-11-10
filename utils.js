
function mungeLocation(location) {
  console.log(location);
  console.log(location[0].display_name);
  return  {
    
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  }; 
}




// /////////////////////

function mungeWeather(location) {
  
  return location.data.map(data => {
    return {
      forecast: data.weather.description,
      time: data.datetime,
    };
  }).slice(0, 8);

}


module.exports = {
  mungeLocation,
  mungeWeather
};
