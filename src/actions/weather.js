'use strict';
import { 
    WEATHER_SUCCESS, 
    WEATHER_ERROR, 
    WEATHER_CLEAR
} from '../constants';

import {
    getByZip,
    getDetailsByZip
} from '../modules/weather';

export function weatherClear(){
    return {
        type : WEATHER_CLEAR
    };
}

function weatherSuccess(weather){
    return {
        type : WEATHER_SUCCESS,
        weather
    };
}

function weatherError(error){
    return {
        type : WEATHER_ERROR,
        weather
    };
}

export function getWeatherByZipThunk(zip){
    return dispatch => {
        return getByZip(zip)
            .then(data => dispatch(weatherSuccess(data)))
            .catch(err => dispatch(weatherError(err)));
        
    };
}

export function getWeatherDetailsByZipThunk(zip){
    return dispatch => {
        return getDetailsByZip(zip)
            .then(data => dispatch(weatherSuccess(data)))
            .catch(err => dispatch(weatherError(err)));
    };
}
