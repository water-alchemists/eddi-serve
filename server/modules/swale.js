'use strict';
import request from 'superagent';
const API_ROUTE = 'http://54.235.200.47/water'

function post(data){
    return request.post(API_ROUTE)
            .send(data)
            .set('Accept', 'application/json');
}

function get(data){
    return request.get(`${API_ROUTE}/*`)
            .set('Accept', 'application/json');
}

module.exports = {
    post : post,
    get : get
};
