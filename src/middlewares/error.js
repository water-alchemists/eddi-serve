'use strict';
function errorHandle({ dispatch }){
	return next => action => {
		const { error } = action;
		if(error instanceof Error) return window.alert(error.message);
		return next(action);
	}

}

export default errorHandle;