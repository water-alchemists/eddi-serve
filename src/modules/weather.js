'use strict';
import superagent from 'superagent';

function getByZip(zip){
    return new Promise((resolve, reject) => {
       superagent.get('/api/weather')
        .query({ zip : zip })
        .type('json')
        .end((err, data) => {
            if(err) return reject(err);
            resolve(data);
        }) 
    })
    .then(res => res.data);
}

function getByCoords(latitude, longitude){
    return new Promise((resolve, reject) => {
        superagent.get('/api/weather')
            .query({ lat : latitude })
            .query({ lon: longitude })
            .type('json')
            .end((err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
    })
    .then(res => res.data);
}

module.exports = {
    getByZip,
    getByCoords
};