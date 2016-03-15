'use strict';
import {
	USER_LOGIN,
	USER_LOGOUT_SUCCESS,
	USER_GETPROFILE_SUCCESS,
	APP_START_SUCCESS
} from '../constants';

const initialState = {

};

export default function(state = initialState, action = {}){
	const { type, user={} } = action;
	switch(type){
	case APP_START_SUCCESS: 
		return {
			...state,
			...user
		};
	case USER_GETPROFILE_SUCCESS : 
		return {
			...state,
			...user
		};
	case USER_LOGOUT_SUCCESS : 
		return {
			... initialState
		};
	default :
		return state;
	}
}