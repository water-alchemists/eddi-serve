'use strict';
const express = require('express'),
    superagent = require('superagent');

const router = express.Router();
    
module.exports = app => {
  const WEATHER_KEY = app.get('WEATHER_KEY'),
    WEATHER_URL = app.get('WEATHER_URL');
  
  router.get('/', (req, res, next) => {
      const params = req.query || {};
      let promise;
      if(params.lat && params.lon) {
        // if there is a latitude and longitude
        promise = new Promise((resolve, reject) => {
            superagent.get(WEATHER_URL)
                .query({ lat : params.lat })
                .query({ lon : params.lon })
                .query({ APPID : WEATHER_KEY })
                .type('json')
                .end((err, data) => {
                    if(err) return reject(err);
                    resolve(data);
                });
        });
      }
      else if(params.zip){
          // if there is a zip code
          if(params.zip.length !== 5) return next(new Error('Not a valid zip code'));
          promise = new Promise((resolve, reject) => {
            superagent.get(WEATHER_URL)
                .query({ zip : `${params.zip},us` })
                .query({ APPID : WEATHER_KEY })
                .type('json')
                .end((err, data) => {
                    if(err) return reject(err);
                    resolve(data);
                });
          })
      }
      else return next(new Error('Not a valid weather search'));
      
      return promise.then(req => JSON.parse(req.text))
                .then(data => res.status(200).json(data))
                .catch(err => next(err));
  });
  
  router.get('/zip', (req, res, next) => {
      const params = req.query || {};
      if(!zip || zip.length !== 5) return next(new Error('Not a valid zip code'));
      return new Promise((resolve, reject) => {
          superagent.get(WEATHER_URL)
            .query({ zip : `${params.zip},us` })
            .query({ APPID : WEATHER_KEY })
            .type('json')
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
      })
      .then(req => JSON.parse(req.text))
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });
  
  return router;
};