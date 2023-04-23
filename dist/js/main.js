import LocationData from "./LocationData.js";
import WeatherData from "./WeatherData.js";
import { addLoadAnimation, displayError, refresh } from "./domBuilder.js";
import { saveLocationInLocalStorage } from "./localStorage.js";
import { getWeatherAPIFromLocation } from "./weatherAPI.js";
/* APP INITIALIZATION */

const weatherData = new WeatherData()
const locationData = new LocationData()

const initApp = () => {
    // EVENTS

    //event for location
    document.querySelector("#searchBar__getLocation").addEventListener("click", loadCurrentLocation)
    //event for search bar
    document.querySelector("#searchBar__form").addEventListener("submit", submitNewLocation)

    //START SETUP 

    //Check and load localstorage to locationData

    //load weather depends on locationData
    //save weather to weatherData

    //build "currentForecast" 
    //build "weekForecast"
    
  };


document.addEventListener("DOMContentLoaded", initApp);



/* EVENT FUNCTIONS */

async function loadCurrentLocation(event) {
    //add load animation
    const mapIcon = document.querySelector(".fa-map-marker-alt");
    addLoadAnimation(mapIcon)

    //check if location is allowed
    if (!navigator?.geolocation) return locationError();
    
    //load location (+update in localData), await and load funciton to wait for localData update
    const load = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    }
    await load().then(position => locationSuccess(position)).catch(err => locationError(err))

    //set new location to localstorage
    saveLocationInLocalStorage(locationData)

    //load weather depends on locationData
    const weatherAPIObject = await getWeatherAPIFromLocation(locationData)

    //save weather to weatherData
    weatherData.setWeather(weatherAPIObject)

    //build "currentForecast" 
    //build "weekForecast"
    refresh(weatherData.getWeatherObj())
}

function submitNewLocation(event) {
    //remove default form action

    //add load animation

    //load input data

    //change input(city, country...) to location(coordinates)
    
    //set new location to localstorage

    //update locationData

    //load weather depends on locationData
    //save weather to weatherData

    //build "currentForecast" 
    //build "weekForecast"

}

/* HANDLERS */

//save location in locationData
const locationSuccess = (position) => {
    //object to save
    const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    locationData.setCoordsObject(coords)
};

const locationError = (errObj) => {
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg);
};