

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



function loadCurrentLocation(event) {
    //add load animation

    //check if location is allowed

    //load location

    //set new location to localstorage

    //update locationData

    //load weather depends on locationData
    //save weather to weatherData

    //build "currentForecast" 
    //build "weekForecast"
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
