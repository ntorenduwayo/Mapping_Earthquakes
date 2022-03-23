// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.0, -80.0], 2);

let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// We create the tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Night Navigation": night,
    "Day Naviation": day
};

// Pass our map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/ntorenduwayo/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
     console.log(data);

// Creating a GeoJSON layer with the retrieved data & add a popup marker that displays all airports' codes and names.
   L.geoJSON(data, {
       style: myStyle,
       onEachFeature: function(feature, layer) {
           console.log(layer);
           layer.bindPopup("<h3> Airine: " + feature.properties.airline + "</h3> <hr></h3> Destination:" 
                     + feature.properties.dst + "</h3>");
       }
   }).addTo(map);
 });
