'use strict';
const request = require('superagent');
const API_ROUTE = 'http://54.235.200.47/water'

function post(data){
    return new Promise((resolve, reject) => {
        request.post(API_ROUTE)
            .send(data)
            .set('Accept', 'application/json')
            .then(resolve, reject);
    });
}

function get(data){
    return new Promise((resolve, reject) => {
        request.get(`${API_ROUTE}/*`)
            .set('Accept', 'application/json')
            .then(resolve, reject);
    })
    .then(res => res.body);
}

module.exports = {
    post : post,
    get : get
};
