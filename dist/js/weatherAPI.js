const UNITS = "metric"

//GET weather from location (40 forecasts, each per 3hour, forecast for 5 days)
export const getWeatherAPIFromLocation = async (locationObj) => {
        // const lat = locationObj.getLat();
        // const lon = locationObj.getLon();
        // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
        // try {
        //   const weatherStream = await fetch(url);
        //   const weatherJson = await weatherStream.json();
        //   return weatherJson
        // } catch (err) {
        //   console.error(err);
        // } 
        const urlDataObj = {
          lat: locationObj.getLat(),
          lon: locationObj.getLon(),
          units: UNITS
        };
        try {
          const weatherStream = await fetch("./.netlify/functions/get_weather", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
          });
          const weatherJson = await weatherStream.json();
          return weatherJson;
        } catch (err) {
          console.error(err);
        }
}

export const getCoordsFromApi = async (entryText) => {
        // const url = `https://api.openweathermap.org/data/2.5/weather?${FLAG}=${entryText}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
        // const encodedUrl = encodeURI(url);
        // try {
        //   const dataStream = await fetch(encodedUrl)
        //   if(!dataStream.ok) return
        //   const jsonData = await dataStream.json();
        //   const jsonCoordData = jsonData["coord"]
        //   jsonCoordData['name'] = `Lat:${jsonCoordData.lat} Long:${jsonCoordData.lon}`
        //   return jsonCoordData;
        // } catch (err) {
        //   console.error(err.stack);
        // } 

        const urlDataObj = {
          text: entryText,
          units: UNITS
        };
        try {
          const dataStream = await fetch("./.netlify/functions/get_coords", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
          });
          if(!dataStream.ok) return
          const jsonData = await dataStream.json();
          const jsonCoordData = jsonData["coord"]
          jsonCoordData['name'] = `Lat:${jsonCoordData.lat} Long:${jsonCoordData.lon}`
          return jsonCoordData;
        } catch (err) {
          console.error(err);
        }
}