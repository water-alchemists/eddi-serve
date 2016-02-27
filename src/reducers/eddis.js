'use strict';
import {
	USER_LOGOUT,
	EDDI_GETALL,
	EDDI_UPDATE,
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
	case EDDI_GETALL : 
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