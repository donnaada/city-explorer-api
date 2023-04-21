const axios = require('axios');

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
    this.low = weatherObj.low_temp;
    this.low = weatherObj.low_temp;
    this.high = weatherObj.high_temp;
    this.temp = weatherObj.temp;
    this.city_name = weatherObj.city_name;
  }
}

const getWeatherData = async (req, res, next) => {
  try {
    let lon = req.query.lon;
    let lat = req.query.lat;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;

    let weatherFromAPI = await axios.get(url);

    let dataToSend = weatherFromAPI.data.data.map(obj => new Forecast(obj));

    res.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
};




module.exports = { getWeatherData };

