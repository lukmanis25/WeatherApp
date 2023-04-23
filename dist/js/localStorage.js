export function saveLocationInLocalStorage(locationData) {
    localStorage.setItem("defaultWeatherLocation", JSON.stringify(locationData.getCoordsObject()));
}

export function loadLocationFromLocalStorage() {
    return JSON.parse(localStorage.getItem("defaultWeatherLocation"));
}