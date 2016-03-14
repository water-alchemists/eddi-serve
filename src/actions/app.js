'use strict';
import { browserHistory } from 'react-router';

import EddiFireStarter from '../modules/eddi-firebase';
import CookieStoreMaker from '../modules/cookie-store';

import { PATHS } from '../constants';

import { 
	APP_START_SUCCESS,
	APP_START_ERROR
} from '../constants';

const EddiFire = EddiFireStarter(),
	EddiCookie = CookieStoreMaker();

function appStartSuccess(user, list, selected){
	return {
		type : APP_START_SUCCESS,
		user,
		list,
		selected
	}
}

function appStartError(error){
	return {
		type : APP_START_ERROR,
		error
	}
}

export function appStartThunk(eddiId){
	return dispatch => {
		const cookie = EddiCookie.getCookie() || {},
			token = cookie.token;
		if(!token) return browserHistory.push(PATHS.HOME); //if there is no token, return the user to home
		return EddiFire.authWithToken(token)
			.then(user => {
				//gets the user profile and eddis
				const { uid } = user,
					promises = [
						EddiFire.getUserProfile(uid),
						EddiFire.getAllEddiByUser(uid)
					];

				return Promise.all(promises);
			})
			.then(data => {
				//after you got them all, dispatch for update all
				const profile = data[0],
					list = data[1];
				let selected;
				if(list.length){
					let potential = list.filter(eddi => eddi.id === eddiId)[0];
					if(!potential) selected = list[0];
					else selected = potential;
				}

				dispatch(appStartSuccess(profile, list, selected));

			})
			.catch(err => {
				const { code } = err;
				if(code === 'EXPIRED_TOKEN') return EddiCookie.deleteCookie();
				dispatch(appStartError(err));
				dispatch()
			});
		
	}
}