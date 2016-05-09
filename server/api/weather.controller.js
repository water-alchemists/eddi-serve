'use strict';
const express = require('express'),
    superagent = require('superagent');

const router = express.Router();
    
module.exports = app => {
  const WEATHER_KEY = app.get('WEATHER_KEY'),
    WEATHER_URL = app.get('WEATHER_URL');
  
  router.post('/', (req, res, next) => {
      const body = req.body;
      
      return new Promise((resolve, reject) => {
          supergent.get(WEATHER_URL)
            .query({ lat : body.lat })
            .query({ lon : body.lon })
            .query({ APPID : WEATHER_KEY })
            .type('json')
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
      })
      .then(data => res.json(data))
      .catch(err => next(err));
  });
  
  return router;
};