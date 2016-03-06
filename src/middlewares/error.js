'use strict';
function errorHandle({ dispatch }){
	return next => action => {
		const { error } = action;
		if(error) window.alert(error.message);
		return next(action);
	}

}

export default errorHandle;