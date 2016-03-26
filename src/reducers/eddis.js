'use strict';
import {
	USER_LOGOUT,
	EDDI_GETALL_SUCCESS,
	EDDI_UPDATE_SUCCESS,
	EDDI_UPDATESTART_SUCCESS ,
	EDDI_UPDATEEND_SUCCESS,
	EDDI_READINGS_SUCCESS,
	EDDI_GETONE_SUCCESS,
	APP_START_SUCCESS
} from '../constants';

const initialState = {
	list : []
};

export default function(state = initialState, action = {}){
	const { type,
		list,
		selected,
		id,
		settings={},
		timing={},
		readings=[]
	} = action;

	let newList;

	switch(type){
	case APP_START_SUCCESS : 
		return {
			...state,
			list,
			selected
		};
	case EDDI_GETALL_SUCCESS :
		let newSelected;
		if( list.length > 0 ){
			if(!state.selected) {
				newSelected = list[0];
			} else {
				newSelected = list.filter(eddi => eddi.id === state.selected.id)[0];
			}
		}

		return {
			...state,
			list
		};
	case EDDI_UPDATE_SUCCESS:
		newList = state.list.map(eddi => {
			if(eddi.id === id){
				//update that one eddi
				const updatedEddi = eddi;
				updatedEddi.settings = {
					...eddi.settings,
					...settings
				};

				//return that eddi
				return updatedEddi;
			}

			//if not the right one
			return eddi;
		});

		return {
			...state,
			list : newList
		}
	case EDDI_UPDATESTART_SUCCESS :
		newList = state.list.map(eddi => {
			if(eddi.id === id){
				//update that one eddi
				const updatedEddi = eddi;

				updatedEddi.settings.timing.start = {
					...eddi.settings.timing.start,
					...timing
				};

				//return that eddi
				return updatedEddi;
			}
			//if not the right one
			return eddi;
		});
		return {
			...state,
			list : newList
		};
	case EDDI_UPDATEEND_SUCCESS :
		newList = state.list.map(eddi => {
			if(eddi.id === id){
				//update that one eddi
				const updatedEddi = eddi;

				updatedEddi.settings.timing.end = {
					...eddi.settings.timing.end,
					...timing
				};

				//return that eddi
				return updatedEddi;
			}
			//if not the right one
			return eddi;
		});
		return {
			...state,
			list : newList
		}
	case EDDI_READINGS_SUCCESS :
		newList = state.list.map(eddi => {
			if(eddi.id === id){
				const updatedEddi = eddi;
				updatedEddi.readings = { ...readings };
				console.log(updatedEddi)
				return updatedEddi;
			}
			return eddi;
		});
		return {
			...state,
			list : newList
		};
	case USER_LOGOUT :
		return {
			... initialState
		};
	default :
		return state;
	}
}
