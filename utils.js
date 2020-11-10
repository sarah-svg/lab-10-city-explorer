function mungeLocation(location) {
  return {
    formatted_query: location.display_name,
    latitude: location.lat,
    longitude: location.lon
  };
}
  
module.exports = {
  mungeLocation
};
