'use strict';

function thunkMiddleware({ dispatch, getState }) {
	console.log('i am here');
	return next => action =>{
		console.log('i am here');
		return typeof action === 'function' ?
			action(dispatch, getState) :
			next(action);
	}
}

export default thunkMiddleware