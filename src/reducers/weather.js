'use strict';
import {
    WEATHER_SUCCESS,
    WEATHER_CLEAR
} from '../constants';

const initialState = {
	id : undefined,
	wind : {},
	snow : {},
	rain : {},
	dt : undefined,
	sys : {},
	main : {},
	weather : [{}]
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
