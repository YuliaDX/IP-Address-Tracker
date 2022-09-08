import L from 'leaflet';

export function addMap(mapArea, lat, lng){
    return L.map(mapArea, {
        center:[lat, lng],
        zoom:10
        
    });
}
export function addLayer(map){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=yourToken', {
    attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
}
export function setView(map,lat,lng){
    map.setView([lat, lng], 10);
}
export function addMarker(icon, lat,lng, map){
    L.marker([lat,lng],{
        icon:icon
    }).addTo(map);

    if (window.matchMedia("(max-width: 1000px)").matches){
        addOffset(map);
    }
}
export function createIcon(iconUrl){
   return L.icon({
        iconUrl:iconUrl,
        iconSize:[40,40],
        iconAnchor: [12, 24]
    });
    
}
function addOffset(map){
    const offset = map.getSize().y * 0.05;
    map.panBy([0, -offset], { animate:false});
    console.log("addOffset");
}