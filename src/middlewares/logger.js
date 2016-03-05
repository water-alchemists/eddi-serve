'use strict';
function logger({ dispatch, getState }){
	return next => action => {
		console.log('dispatching : ', action);
		return next(action);
	}

}

export default logger;