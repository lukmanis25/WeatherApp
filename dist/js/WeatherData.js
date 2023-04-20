export default class WeatherData {
    constructor() {
        this._weatherType = null //rain snow sun etc
        this._temp = null
        this._icon = null // icon for depends of weatherType
        this._wind = null
        this._humidity = null
        this._pressure = null //ZMIENIONE Z chanceOFRain
        this._city = null
        this._date = {
            dayWeekName: null,
            day: null,
            mounth: null,
        }
        //TODO !!!
        //add forecast for next 5 days
        //https://github.com/gitdagray/weather_app_tut/blob/42dae7099ba2b70d0605e2ae9ef4ec26f8df323c/dist/js/domFunctions.js#L63
    }
    
    //set date from datetime string ("2023-04-21 00:00:00")
    setDate(dateString) {
        //TODO (if short add this to setWeather)
        const date1 = new Date("2023-04-21 00:00:00")
        console.log(date1.getDay())
    }

    //set using object from weather api
    setWeather(weatherAPIObj) {
        console.log(weatherAPIObj)
        this._weatherType = weatherAPIObj['list']['0']['weather']['0']['description']
        this._temp = weatherAPIObj['list']['0']['main']['temp']
        this.icon = weatherAPIObj['list']['0']['weather']['0']['icon']
        this._wind = weatherAPIObj['list']['0']['wind']['speed']
        this._humidity = weatherAPIObj['list']['0']['main']['humidity'] //in %
        this._pressure = weatherAPIObj['list']['0']['main']['pressure']
        this._city = weatherAPIObj['city']['name']
        this.setDate(weatherAPIObj['list']['0']['dt_txt'])
        //TODO set 5 day forecast
    }

    getName() {
        return this._weatherType;
    }

}