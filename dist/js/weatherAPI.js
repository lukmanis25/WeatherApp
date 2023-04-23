const WEATHER_API_KEY = "2e6674c12f4ccd8177c688b8f1d6ac1b"
const UNITS = "metric"
const FLAG = "q"

//GET weather from location (40 forecasts, each per 3hour, forecast for 5 days)
export const getWeatherAPIFromLocation = async (locationObj) => {
        const lat = locationObj.getLat();
        const lon = locationObj.getLon();
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
        try {
          const weatherStream = await fetch(url);
          const weatherJson = await weatherStream.json();
          //return weatherJson
          //TODO return coord object
        } catch (err) {
          console.error(err);
        } 
}

export const getCoordsFromApi = async (entryText) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?${FLAG}=${entryText}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
        const encodedUrl = encodeURI(url);
        try {
          const dataStream = await fetch(encodedUrl);
          const jsonData = await dataStream.json();
          return jsonData;
        } catch (err) {
          console.error(err.stack);
        } 
}