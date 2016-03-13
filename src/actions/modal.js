'use strict';
import { MODAL_ON, MODAL_OFF } from '../constants';

export function modalShow(component, props){
	return {
		type : MODAL_ON,
		component,
		props
	};
}

export function modalHide(){
	return {
		type : MODAL_OFF,
	}
}
