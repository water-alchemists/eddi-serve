'use strict';
const request = require('superagent'),
    parser = require('xml2json');

// uses OpenWeatherMap

function getJsonByLatLng(WEATHER_URL, WEATHER_KEY, lat, lon){
    return new Promise((resolve, reject) => {
        request.get(WEATHER_URL)
            .query({ lat : lat })
            .query({ lon : lon })
            .query({ units : `imperial` }) // metric, unit default is Kelvin
            .query({ APPID : WEATHER_KEY })
            .type('json')
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
    })
    .then(req => req.body);
}

function getJsonByZip(WEATHER_URL, WEATHER_KEY, zip){
    return new Promise((resolve, reject) => {
        request.get(WEATHER_URL)
            .query({ zip : `${zip},us` })
            .query({ units : `imperial` }) // metric, unit default is Kelvin
            .query({ APPID : WEATHER_KEY })
            .type('json')
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
    })
    .then(req => req.body);
}

function getXmlByZip(WEATHER_URL, WEATHER_KEY, zip){
    return new Promise((resolve, reject) => {
        request.get(WEATHER_URL)
            .query({ zip : `${zip},us` })
            .query({ mode : 'xml' })
            .query({ APPID : WEATHER_KEY })
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
    })
    .then(req => {
        const text = req.text;
        return text ? JSON.parse(parser.toJson(text)) : text;
    });
}

module.exports = (WEATHER_URL, WEATHER_KEY) => {
    return {
      getJsonByZip : zip => getJsonByZip(WEATHER_URL, WEATHER_KEY, zip),
      getJsonByLatLng : (lat, lng) => getJsonByLatLng(WEATHER_URL, WEATHER_KEY, lat, lon),
      getXmlByZip : zip => getXmlByZip(WEATHER_URL, WEATHER_KEY, zip)
    };
}

