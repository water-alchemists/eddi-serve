'use strict';
import {
	USER_LOGOUT,
	EDDI_GETALL_SUCCESS,
	EDDI_GETALL_ERROR,
	EDDI_UPDATE_SUCCESS,
	EDDI_UPDATE_ERROR,
	EDDI_GETONE_SUCCESS,
	EDDI_GETONE_ERROR,
	EDDI_SELECT
} from '../constants';

const initialState = {
	list : null,
	selected : null
};

export default function(state = initialState, action = {}){
	const { type, eddis = {} } = action,
		{ list, selected } = eddis;
	switch(type){
	case EDDI_GETALL_SUCCESS : 
		console.log('eddi got all');
		return {
			...state,
			list
		};
	case EDDI_SELECT : 
		console.log('eddi selected');
		return {
			...state,
			selected
		};
	case USER_LOGOUT : 
		console.log('eddis cleared');
		return {
			... initialState
		};
	default :
		return state;
	}
}