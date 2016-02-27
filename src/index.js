'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import * as middlewares from './middlewares';
import { App, Home, Login, Signup } from './containers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
console.log('this is the middlewares', middlewares);
const store = createStoreWithMiddleware(reducer);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path='/react' component={App}>
					<IndexRoute component={Home}/>
					<Route path='/react/login' component={Login}/>
					<Route path='/react/signup' component={Signup}/>
				</Route>
			</Router>
		</div>
	</Provider>,
	document.getElementById('mount')
);