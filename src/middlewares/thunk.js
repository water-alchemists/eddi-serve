'use strict';

function thunkMiddleware({ dispatch, getState }) {
	return next => action => {
		return typeof action === 'function' ?
			action(dispatch, getState) :
			next(action);
	}
}

export default thunkMiddleware