export function saveLocationInLocalStorage(locationData) {
    localStorage.setItem("defaultWeatherLocation", JSON.stringify(locationData.getCoordsObject()));
}

export function loadLocationFromLocalStorage() {
    //TODO
}