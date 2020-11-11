//////////////////////location api
function mungeLocation(location) {
  // console.log(location);
  // console.log(location[0].display_name);
  return  {
    
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  }; 
}




// ///////////////////// weather api

function mungeWeather(location) {
  
  return location.data.map(data => {
    return {
      forecast: data.weather.description,
      time: data.datetime,
    };
  }).slice(0, 8);

}
////////////////////////////
// function mungeTrail(trails) {
//   let hikingArray = trails.trails.map((trail) => {

//     return {
      
//       name: trail.name,
//       location: trail.location,
//       length: trail.length,
//       stars: trail.stars,
//       votes: trail.starVotes,
//       summary: trail.summary,
//       url: trail.url,
//       conditions: trail.conditionDetails,
//       conditionDate: trail.conditionDate
//     };
    
//   });
//   return hikingArray.slice(0, 1);
// }
function mungeTrail(trail) {
  
  return trail.trails.map(item => {
    return {
      name: item.name,
      location: item.location,
      length: item.length,
      stars: item.stars,
      star_votes: item.starVotes,
      summary: item.summary,
      trail_url: item.url,
      conditions: item.conditionStatus,
      condition_date: item.conditionDate.split(' ')[0],
      condition_time: item.conditionDate.split(' ')[1],
    };
  }).slice(0, 10);

}

/////////



function mungeYelp(location) {

  return location.businesses.map(item => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
  }).slice(0, 20);

}

// function mungeYelp(data){

//   return data.businesses.map(business => {
//     return {
//       name: business.name,
//       image_url: business.image_url,
//       price: business.price,
//       rating: business.rating,
//       url: business.url
//     };
//   });
// }
/////////////////////
module.exports = {
  mungeLocation,
  mungeWeather,
  mungeTrail,
   mungeYelp,
};

