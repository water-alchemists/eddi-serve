'use strict';
import EddiFireStarter from '../modules/eddi-firebase';
import {
	USERLOGIN_SUCCESS,
	USERLOGIN_ERROR,
	USER_LOGOUT,
	USERUPDATE_SUCCESS,
	USERUPDATE_ERROR,
	USER_GET,
	USERCREATE_ERROR
} from '../constants';

const EddiFire = EddiFireStarter();

function userLoginSuccess(user){
	return {
		type : USERLOGIN_SUCCESS,
		user
	};
}

function userLoginError(error){
	return {
		export : USERLOGIN_ERROR,
		error
	}
}

export function userLogout(){
	return {
		type : USER_LOGOUT
	};
}

function userUpdateSuccess(user){
	return {
		type : USERUPDATE_SUCCESS,
		user
	};
}

function userUpdateError(user){
	return {
		type : USERUPDATE_ERROR,
		user
	};
}

export function userGet(user){
	return {
		type : USER_GET,
		user
	}
}

function userCreateError(error){
	return {
		type : USERCREATE_ERROR,
		error
	};
}

export function userCreateThunk(user){

	return dispatch => {
		const { email, password } = user;
		return EddiFire.createUser({ email, password })
			.then(userSuccess => {
				console.log('this is the userSuccess', userSuccess);
				const id = userSuccess.uid;
				delete user.password;
				console.log('created a user', userSuccess);
				return EddiFire.createUserProfile(id, user);
			})
			.catch(err => dispatch(userCreateError(err)));
	}
}

export function userLoginWithPasswordThunk(email, password){
	return dispatch => {
		return EddiFire.authWithPassword(email, password)
			.then(user => console.log('this is the user', user))
			.catch(err => dispatch(userLoginError(err)));
	}
}

export function userLoginWithTokenThunk(token){
	return dispatch => {
		return EddiFire.authWithToken(token)
			.then(user => console.log('this is the user', user))
			.catch(err => dispatch(userLoginError(err)));
	}
}