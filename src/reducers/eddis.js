'use strict';
import {
	USER_LOGOUT,
	EDDI_GETALL_SUCCESS,
	EDDI_GETALL_ERROR,
	EDDI_UPDATE_SUCCESS,
	EDDI_GETONE_SUCCESS,
	EDDI_GETONE_ERROR,
	EDDI_SELECT
} from '../constants';

const initialState = {
	list : [],
	selected : null
};

export default function(state = initialState, action = {}){
	const { type, list, selected, id, settings={}} = action;
	switch(type){
	case EDDI_GETALL_SUCCESS : 
		console.log('eddi got all', list);
		return {
			...state,
			list
		};
	case EDDI_UPDATE_SUCCESS:{
		const newList = state.list.map(eddi => {
			if(eddi.id === id){
				const updatedEddi = {...eddi};

				updatedEddi.settings = {
					...eddi.settings,
					...settings
				};

				return updatedEddi;
			}
			return eddi;
		});

		return {
			...state,
			list : newList
		}
	}
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