'use strict';
import EddiFireStarter from '../modules/eddi-firebase';
import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_UPDATE,
	USER_GET
} from '../constants';

const EddiFire = EddiFireStarter();

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
	// console.log('i am clicked', EddiFire);
	return function(dispatch) {
		const { email, password } = user;
		return EddiFire.createUser({ email, password })
			.then(userSuccess => {
				const id = userSuccess.uid;
				delete user.password;
				console.log('created a user', userSuccess);
				return EddiFire.createUserProfile(id, user);
			});
	}
}

export function userThunk(){

}