const FORECAST_DAY_NUMBER = 5
const FORECAST_ARRAY_LENGTH = 40
const FIVE_DAYS_FORECAST_HOUR = 15 //hour to check for 5 days forecast
const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

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
        this._nextFiveDaysWeather = [] //dayWeekName, icon, temp
    }
    
    //set date from datetime string (example input: "2023-04-21 00:00:00")
    setDate(dateString) {
        const date = new Date(dateString)
        const dayWeekName = weekDays[date.getDay()]; //change 0, 1, 2... to Sunday, Monday, Tuesday ...
        const day = date.getDate()
        const mounth = monthNames[date.getMonth()] //change 0, 1, 2... to January, February, March...
        this._date.dayWeekName = dayWeekName
        this._date.day = day
        this._date.mounth = mounth
    }

    setNextFiveDaysWeather(weatherAPIObj) {
        let index = 0 //index in weatherAPIObject.list
        const date = new Date(weatherAPIObj['list']['0']['dt_txt']) //Current date
        for(let i = 0; i < FORECAST_DAY_NUMBER; i++){
            //take next day
            const nextDate = new Date(date)
            nextDate.setDate(date.getDate() + i + 1);
            //look for weatherListObject on next day at 15:00 or take last forecast
            let weatherListObject = weatherAPIObj['list'][index.toString()] 
            let weatherListObjectDate = new Date(weatherListObject['dt_txt'])
            while(index < FORECAST_ARRAY_LENGTH - 1 && (weatherListObjectDate.getDate() !== nextDate.getDate() || weatherListObjectDate.getHours() !== FIVE_DAYS_FORECAST_HOUR)) {
                index += 1
                weatherListObject = weatherAPIObj['list'][index.toString()]
                weatherListObjectDate = new Date(weatherListObject['dt_txt'])
            }
            //Push new forecast
            this._nextFiveDaysWeather.push({
                dayWeekName : weekDays[nextDate.getDay()], //change 0, 1, 2... to Sunday, Monday, Tuesday ...
                icon : weatherListObject['weather']['0']['icon'],
                temp : weatherListObject['main']['temp']
            })
        }
    }

    //set using object from weather api
    setWeather(weatherAPIObj) {
        this._weatherType = weatherAPIObj['list']['0']['weather']['0']['description']
        this._temp = weatherAPIObj['list']['0']['main']['temp']
        this._icon = weatherAPIObj['list']['0']['weather']['0']['icon']
        this._wind = weatherAPIObj['list']['0']['wind']['speed']
        this._humidity = weatherAPIObj['list']['0']['main']['humidity'] //in %
        this._pressure = weatherAPIObj['list']['0']['main']['pressure']
        this._city = weatherAPIObj['city']['name']
        this.setDate(weatherAPIObj['list']['0']['dt_txt'])
        this.setNextFiveDaysWeather(weatherAPIObj)
    }

    getWeatherObj() {
        return {
            weatherType : this._weatherType, 
            temp : this._temp,
            icon : this._icon,
            wind : this._wind,
            humidity : this._humidity,
            pressure : this._pressure, 
            city : this._city,
            date : this._date,
            nextFiveDaysWeather : this._nextFiveDaysWeather
        }
    }
}