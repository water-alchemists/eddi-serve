'use strict';
import thunk from './thunk';
import logger from './logger';
import errorHandle from './error';

export default [
	logger,
	thunk,
	errorHandle
];