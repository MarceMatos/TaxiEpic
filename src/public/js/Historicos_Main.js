const socket  = io();
socket.emit('Client: HistoricsPage')

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


 var theMarker = {};

  map.on('click',function(e){
    lat = e.latlng.lat;
    lon = e.latlng.lng;

    console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
        //Clear existing marker, 

        if (theMarker != undefined) {
              map.removeLayer(theMarker);
        };

    //Add a marker to show where you clicked.
     theMarker = L.marker([lat,lon]).addTo(map);  
});


//id for historics button
HistoricsForm = document.querySelector('#Historicos');
//Sockets for connection to the backend 

//Connection for historics required
socket.on('Server: NewHistorics',(data)=>{
    if(data.length!==0){
        ActualizarHistoricos(data);
    }
})


HistoricsForm.addEventListener('click',()=>{
    DateVar = document.getElementById('Date').value;
    TimeArray = document.getElementById('Hour').value.split(' - ');
    TimeIVar = TimeArray[0];
    TimeFVar = TimeArray[1];

    TimeArray = [{Date: DateVar, TimeI: TimeIVar, TimeF: TimeFVar}];
    socket.emit("Client: RequiredHistoricos", TimeArray);
})


function ActualizarHistoricos(data){
    HistoricsArray = [];
    center = [data[data.length-1].latitud,data[data.length-1].longitud];
    if (typeof marker !== 'undefined'){
        map.removeLayer(marker);
    }else{
        map.setView(center,14);
    }
    if (typeof PolyLine !== 'undefined'){
        map.removeLayer(PolyLine);
    }
    
    
    //ciruclo
    
    
    var circleCenter = [11.0178, -74.8204];
    var circleOptions = {
                   color: 'red',
                   fillColor: '#f03',
                   fillOpacity: 0
                          }
    var circle = L.circle(circleCenter, 500000, circleOptions);
    circle.addTo(map);
    
    
    
    
    
    
    data.forEach(data => {
        HistoricsArray.push([data.latitud,data.longitud])
    })
    map.setView(center);
    marker = L.marker(center);
    PolyLine = L.polyline(HistoricsArray,{color:'blue'})
    marker.bindPopup("Última posición");
    map.addLayer(marker);
    map.addLayer(PolyLine);
}

console.log('Prueba actualizacion 1.4')
