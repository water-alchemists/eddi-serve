'use strict';
import { browserHistory } from 'react-router';
import { PATHS } from '../constants';

function errorHandle({ dispatch }){
	return next => action => {
		const { error } = action;
		if(error instanceof Error) {
			if(error.message.indexOf('not authenticated') > -1) return browserHistory.push(PATHS.HOME);
			return window.alert(error.message);
		}
		return next(action);
	}

}

export default errorHandle;