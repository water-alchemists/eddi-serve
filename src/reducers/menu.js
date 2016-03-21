'use strict';
import { MENU_NAME_CHANGE } from '../constants';

const initialState = {
	name: ""
};

export default function(state = initialState, action = {}){
	const { type, name } = action;
	switch(type){
	case MENU_NAME_CHANGE:
		console.log('this is the name', name, 'state', state.name)
		if(name === state.name) return state;
		return {
      		...state,
			name
		};
	default:
		return state;
	}
}
