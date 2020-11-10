
function mungeLocation(location) {
console.log(location);
console.log(location[0].display_name);
  return  {
    
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  }; 
}




/////////////////////
function mungeWeather(weather) {
  return {
    forecast: weather[0].weather.description,
    time: weather.datetime,
  }; 
}

// function mungedWeather(location) {
  
//   return location.data.map(item => {
//     return {
//       forecast: item.weather.description,
//       time: item.datetime,
//     };
//   }).slice(0, 8);

// }



module.exports = {
  mungeLocation,
  mungeWeather
};
