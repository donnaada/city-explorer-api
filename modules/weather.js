'use strict';

// let axios = require('axios');
let {cacheData} = require('../cache');

// let cache = {};
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
    this.low = weatherObj.low_temp;
    this.low = weatherObj.low_temp;
    this.high = weatherObj.high_temp;
    this.temp = weatherObj.temp;
  }
}

const getWeatherData = async (request, response) => {
  try {
    let lon = request.query.lon;
    let lat = request.query.lat;
    const key = `weather-lat${lat}-lon${lon}`;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=7`;

    cacheData(response, key, url, 'data', Forecast, 1);

  } catch (error) {
    // next(error);
    console.log(error);
  }

};

module.exports = {getWeatherData};
