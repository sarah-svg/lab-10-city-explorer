function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  }; 
}
function mungeWeather(weather) {
  return {
    forecast: weather[0].weather.description,
    time: weather.dateTime
  }; 
} 






module.exports = {
  mungeLocation,
  mungeWeather
};
