'use strict';
const express = require('express');

const getWeatherApi = require('../modules/weather');

const router = express.Router();
    
module.exports = app => {
  const WEATHER_KEY = app.get('WEATHER_KEY'),
    WEATHER_URL = app.get('WEATHER_URL');
 
  const weather = getWeatherApi(WEATHER_URL, WEATHER_KEY);
  
  router.get('/', (req, res, next) => {
      const params = req.query || {};
      let promise;
      if(params.lat && params.lon) {
        // if there is a latitude and longitude
        promise = weather.getJsonByLatLng(params.lat, params.lon);
      }
      else if(params.zip){
          // if there is a zip code
          if(params.zip.length != 5) return next(new Error('Not a valid zip code'));
          promise = weather.getJsonByZip(params.zip);
      }
      else return next(new Error('Not a valid weather search'));
      
      return promise
                .then(data => res.status(200).json(data))
                .catch(err => next(err));
  });
  
  return router;
};