
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
// function mungeWeather(data) {
//   const returnArray = 

//     {
//       forecast: '',
//       datetime: 0

//     }
//   ;

//   for(let i = 0; i < data.length; i++) {
//     returnArray[i].forecast = data[i].weather.description;
//     returnArray[i].time = data[i].datetime;
//   }
//   return returnArray;

//   // console.log('we are here' + data);
//   // console.log('data[0]: ' + data[0]);

//   return {
//     forecast: data[0].weather.description,
//     time: data[0].datetime
    
//   }; 
// }
 
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
