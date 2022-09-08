import 'leaflet/dist/leaflet.css';
import iconUrl from '../images/icon-location.svg'
import L from 'leaflet';

import {validateIPAddress,addLayer, addMarker, createIcon, addMap, setView} from './helpers';

const ipAddressInput = document.querySelector('.search-bar__input');
const btnIPAddress = document.querySelector('.search-bar__btn');
const ipLabel = document.querySelector('#ip');
const locationLabel = document.querySelector('#location');
const ispLabel = document.querySelector('#isp');
const timezoneLabel = document.querySelector('#timezone');

const mapArea = document.querySelector('.map');
const map = addMap(mapArea, 51.505, -0.09);
addLayer(map);
const icon = createIcon(iconUrl);

document.addEventListener("DOMContentLoaded", ()=>{
    getIPGeoLocation("101.11.201.22").then(setInfo);
});

btnIPAddress.addEventListener("click", getIPGeoLocation);
ipAddress.addEventListener("keydown", handleKey);

async function getIPGeoLocation(ip){
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=yourAPIKey&ipAddress=${ip}`);
    return await response.json();
}
function navigateToGeoLocationByIPAddress(){
    const ip = ipAddressInput.value;
    if (validateIPAddress(ip)){
        getIPGeoLocation(ip).then(setInfo);
    }
}
function handleKey(e){
    if (e.key == 'Enter'){
        navigateToGeoLocationByIPAddress();
    }

}
function setInfo(data){
    ipLabel.innerText = data.ip;
    locationLabel.innerText = `Country: ${data.location.country} Region: ${data.location.region}`;
    ispLabel.innerText = data.isp;
    timezoneLabel.innerText = data.location.timezone;
    const {lat, lng} = data.location;
    
    setView(map, lat, lng);
    addMarker(icon, lat, lng, map);
}