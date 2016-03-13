'use strict';
import { MODAL_ON, MODAL_OFF } from '../constants';

const initialState = {
	on : false,
	component : '',
	props : {},
};

export default function(state = initialState, action = {}){
	const { type, component, props={} } = action;
	switch(type){
	case MODAL_ON:
		return {
			...state,
			on : true,
			props : {...props},
			component,
		};
	case MODAL_OFF:
		return {
			...initialState
		};
	default:
		return state;
	}
}
