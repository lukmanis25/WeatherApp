export default class LocationData {
    constructor() {
        this._name = "Location is not set";
        this._lat = null;
        this._lon = null;
      }

      //set name lat and lon with object coords {name, lot, lan}
      setCoordsObject = (coords) => {
        this._name = coords.name;
        this._lat = coords.lat;
        this._lon = coords.lon;
      };

      getCoordsObject = () => {
        return {
          name: this._name,
          lat: this._lat,
          lon: this._lon
        }
      }

      getName() {
        return this._name;
      }
    
      setName(name) {
        this._name = name;
      }
    
      getLat() {
        return this._lat;
      }
    
      setLat(lat) {
        this._lat = lat;
      }
    
      getLon() {
        return this._lon;
      }
    
      setLon(lon) {
        this._lon = lon;
      }

}