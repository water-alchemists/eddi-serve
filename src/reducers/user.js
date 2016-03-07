'use strict';
import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_GETPROFILE_SUCCESS
} from '../constants';

const initialState = {

};

export default function(state = initialState, action = {}){
	const { type, user = {} } = action;
	switch(type){
	case USER_GETPROFILE_SUCCESS : 
		console.log('user logged in');
		return {
			...state,
			...user
		};
	case USER_LOGOUT : 
		console.log('user logged out');
		return {
			... initialState
		};
	default :
		return state;
	}
}