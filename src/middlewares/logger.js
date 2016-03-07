'use strict';
function logger({ dispatch, getState }){
	return next => action => {
		console.log('dispatching :', action);
		next(action);
		console.log('new state :', getState());
		return;
	}

}

export default logger;