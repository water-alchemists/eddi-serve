'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import middlewares from './middlewares';
import { App, Home, Login, Signup, Dashboard, Report, Settings, Troubleshoot } from './containers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const reduxRouterMiddleware = routerMiddleware(browserHistory),
	enhanceWithMiddleware = applyMiddleware(...middlewares, reduxRouterMiddleware);

const store = enhanceWithMiddleware(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path='/react' component={App}>
					<IndexRoute component={Home}/>
					<Route path='/react/login' component={Login}/>
					<Route path='/react/signup' component={Signup}/>
					<Route path='/react/dashboard' component={Dashboard}/>
					<Route path='/react/report' component={Report}/>
					<Route path='/react/settings' component={Settings}/>
					<Route path='/react/troubleshoot' component={Troubleshoot}/>
				</Route>
			</Router>
		</div>
	</Provider>,
	document.getElementById('mount')
);