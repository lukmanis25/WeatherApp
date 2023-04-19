export default class WeatherData {
    constructor() {
        this._weatherType = null //rain snow sun etc
        this._temp = null
        this._icon = null // icon for depends of weatherType
        this._wind = null
        this._humidity = null
        this._chanceOFRain = null
        this._city = null
        this._date = {
            weekDay: null,
            mounthDay: null,
            mounth: null
        }
        //TODO !!!
        //add more state from createCurrentConditionsDivs https://github.com/gitdagray/weather_app_tut/blob/42dae7099ba2b70d0605e2ae9ef4ec26f8df323c/dist/js/domFunctions.js#L63
    }
    getName() {
        return this._weatherType;
    }

}