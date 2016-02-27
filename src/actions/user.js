'use strict';
import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_UPDATE,
	USER_GET
} from '../constants';

export function userLogin(user){
	return {
		type : USER_LOGIN,
		user
	};
}

export function userLogout(){
	return {
		type : USER_LOGOUT
	};
}

export function userUpdate(user){
	return {
		type : USER_UPDATE,
		user
	};
}

export function userGet(user){
	return {
		type : USER_GET,
		user
	}
}

export function userCreateThunk(user){
	return dispatch => {
		
	}
}