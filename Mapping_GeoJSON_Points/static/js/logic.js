// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with a center of the map to somewhere between LAX and SFO and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
// // Grabbing our GeoJSON data. Using pointTolayer:
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.name + "<h2>" +
//       "<h3><p>" + feature.properties.city + ", " + feature.properties.country + "</h3></p>");
//     }
// Grabbing our GeoJSON data, using onEachFeaure:
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + 
        "<br>" + "Airport name: " + feature.properties.name +"</h2>");
    }
}).addTo(map);
// // Coordinates for each point to be used in the line.
// let line = [
// [37.6213, -122.3790],//sfo
//   [30.1975, -97.6664],//aus
//   [43.6777, -79.6248],//yyz
//   [40.6413, -73.7781]//jfk  
// ];

// // Create a polyline using a dashed line coordinates and make the dashed-line blue.
// L.polyline(line,{
//     color: "blue",
//     dashArray: "5,10",
//     weight: 4,
//     opacity: 0.5
//   }).addTo(map);
// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color: "yellow"
// }).addTo(map);
// // Get data from cities.js
// let cityData = cities;
// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(cityData) {
//     console.log(cityData)
//     L.circleMarker(cityData.location,{
//         color: 'orange',
//         fillColor: '#ffffa1',
//         fillOpacty: 0.2,
//         radius: cityData.population/200000
//     })
//     .bindPopup("<h2>" + cityData.city + ", " + cityData.state + "</h2> <hr> <h3>Population " + cityData.population.toLocaleString() + "</h3>")
//     .addTo(map);
//    });
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);