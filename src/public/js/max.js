//Initialice the map
var map = L.map('map-template');
TileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(TileURL).addTo(map);
PolyArray = [];

Lat = 10.994326;
Lon = -74.805578;
map.setView([Lat,Lon],14);

//Create icon for marker
var MapIcon = L.Icon.extend({
    options: {
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    }
})

