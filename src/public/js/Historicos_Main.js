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

//onclick
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
     circle = Wrld.circle([lat,lon], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.6,
          radius: 100.0,  
                                        }).addTo(map); 
});

//circulo

 


//id for historics button
HistoricsForm = document.querySelector('#Historicos');
HistoricsFormLocation = document.querySelector('#LocationButton')
//Sockets for connection to the backend 

//Connection for historics required
socket.on('Server: NewHistorics',(data)=>{
    if(data.length!==0){
        ActualizarHistoricos(data);
    }
})
socket.on('Server: NewHistoricsLocation',(data)=>{
    console.log(data)
    ActualizarHistoricosLocation(data);
})


HistoricsForm.addEventListener('click',()=>{
    InitialDate = document.getElementById('Date').value.split(' ');
    FinalDate = document.getElementById('Hour').value.split(' ');
    TimeIVar = InitialDate[1];
    DateIvar = InitialDate[0];
    TimeFVar = FinalDate[1];
    DateFvar = FinalDate[0];

    TimeArray = {DateI: DateIvar,DateF:DateFvar, TimeI: TimeIVar, TimeF: TimeFVar};
    socket.emit("Client: RequiredHistoricos", TimeArray);
})

HistoricsFormLocation.addEventListener('click',()=>{
    point = 0;
    socket.emit("Client: RequiredHistoricosLocation", point);
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
    
    
   
    
    
    
    
    
    data.forEach(data => {
        FechaAct = data.fecha;
        if(typeof FechaAnt !== 'undefined'){
            if (FechaAct == FechaAnt){
                console.log(FechaAct)
                if (typeof PolyLine !== 'undefined'){
                    map.removeLayer(PolyLine);
                }
                PolyLine = L.polyline(HistoricsArray,{color:'blue'})
                map.addLayer(PolyLine);
            }else{
                HistoricsArray=[];
            }
        }
        HistoricsArray.push([data.latitud,data.longitud])
        FechaAnt = data.fecha;
    })
    map.setView(center);
    marker = L.marker(center);
    marker.bindPopup("Última posición");
    map.addLayer(marker);
}

function ActualizarHistoricosLocation(data){
    if (typeof marker !== 'undefined'){
        
    }else{
        map.setView([data[data.length-1].latitud,data[data.length-1].longitud],14);
    }
    if (typeof PolyLine !== 'undefined'){
        map.removeLayer(PolyLine);
    }
    data.forEach(data => {
        center = [data.latitud,data.longitud];
        marker = L.marker(center);
        marker.bindPopup();
        map.addLayer(marker);
    })
    map.setView([data[data.length-1].latitud,data[data.length-1].longitud]);

}
