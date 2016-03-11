'use strict';
import { MODAL_ON, MODAL_OFF } from '../constants';

const initialState = {
	on : false,
	component : '',
	props : {},
	context : {},
	overlay : {}
};

export default function(state = initialState, action = {}){
	const { type, component, props={}, context={}, overlay={} } = action;
	switch(type){
	case MODAL_ON:
		return {
			...state,
			on : true,
			props : {...props},
			component,
			context,
			overlay
		};
	case MODAL_OFF:
		return {
			...initialState
		};
	default:
		return state;
	}
}