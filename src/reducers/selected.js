'use strict';
import { 
	APP_START_SUCCESS,
	EDDI_READINGS_SUCCESS,
	EDDI_GETONE_SUCCESS,
	EDDI_GETALL_SUCCESS,
	EDDI_UPDATE_SUCCESS,
	EDDI_UPDATESTART_SUCCESS,
	EDDI_UPDATEEND_SUCCESS,
	EDDI_STATE_SUCCESS,
	EDDI_SELECT,
	USER_LOGOUT
} from '../constants';

import { mapDateToReadings } from '../data';

const initialState = {
	id : null,
	settings : {
		name : null,
		salinity: null,
		state : null,
		timing: null,
		zip : null
	},
	state : {
		state : null,
		updated : null,
		reason : null
	},
	version : {
		artik : {
			number : "0.1",
			date : new Date()
		},
		eddi : {
			number : "0.1",
			date : new Date()
		}
	},
	readings : null,
	users : null
};

export default function(state = initialState, action = {}){
	const { type, 
		id, 
		settings={}, 
		timing={}, 
		readings= {},
		selected={},
		list = []
	} = action;

	switch(type){
	case APP_START_SUCCESS : 
		if(!selected.readings) selected.readings = [];
		else if(!Array.isArray(selected.readings)) selected.readings = mapDateToReadings(selected.readings);
		return {
			...initialState,
			...selected
		};
		break;
	case EDDI_SELECT : 
		if(!selected.readings) selected.readings = [];
		else if(!Array.isArray(selected.readings)) selected.readings = mapDateToReadings(selected.readings);

		return {
			...initialState,
			...selected
		};
		break;
	case EDDI_GETONE_SUCCESS :
		if(!selected.readings) selected.readings = [];
		else if(!Array.isArray(selected.readings)) selected.readings = mapDateToReadings(selected.readings);

		return {
			...initialState,
			...selected
		};
		break;
	case EDDI_GETALL_SUCCESS : 
		let newSelected;
		if(!state.id && list.length) newSelected = list[0];
		if(newSelected) {
			if(!selected.readings) newSelected.readings = [];
			else if(!Array.isArray(newSelected.readings)) newSelected.readings = mapDateToReadings(newSelected.readings);

			return {
				...initialState,
				...newSelected
			};
		} else return state;
		break;
	case EDDI_UPDATE_SUCCESS : 
		if(state.id === id) {
			return {
				...state,
				settings : {
					...state.settings,
					...settings
				}
			};
		} else return state;
		break;
	case EDDI_UPDATESTART_SUCCESS : 
		if(state.id === id){
			return {
				...state,
				settings : {
					...state.settings,
					timing : {
						...state.settings.timing,
						start : {
							...timing
						}
					}
				}
			}
		} else return state;
		break;
	case EDDI_UPDATEEND_SUCCESS : 
		if(state.id === id){
			return {
				...state,
				settings : {
					...state.settings,
					timing : {
						...state.settings.timing,
						end : {
							...timing
						}
					}
				}
			};
		} else return state;
		break;
	case EDDI_READINGS_SUCCESS : 
		if(state.id === id){
			state.readings.forEach(r => delete readings[r.epoch]);
			const additional = mapDateToReadings(readings);

			return {
				...state,
				readings : [
					...state.readings,
					...additional
				]
			}
		} else return state;
		break;
	case EDDI_STATE_SUCCESS : 
		if(state.id === id){
			return {
				...state,
				state : {
					...action.state
				}
			};
		} else return state;
		break;
	case USER_LOGOUT : 
		return {
			...initialState
		};
		break;
	default :
		return state;
	}
}