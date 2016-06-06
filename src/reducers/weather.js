'use strict';
import {
    WEATHER_SUCCESS,
    WEATHER_CLEAR
} from '../constants';

const initialState = {
};

export default function(state = initialState, action = {}){
	const { type, weather={} } = action;
	switch(type){
	case WEATHER_SUCCESS:
		return {
            ...state,
            ...weather
        };
	case WEATHER_CLEAR:
		return {
			...initialState
		};
	default:
		return state;
	}
}
