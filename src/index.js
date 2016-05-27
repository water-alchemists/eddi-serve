'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import middlewares from './middlewares';
import { PATHS } from './constants';
import { App,
	Home,
	List,
	Dashboard,
	Report,
	Settings,
	Troubleshoot,
	Profile
} from './containers';

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
		<Router history={history}>
			<Route path={PATHS.HOME} component={App}>
				<IndexRoute component={Home}/>
				<Route path={PATHS.DASHBOARD} component={Dashboard}/>
				<Route path={PATHS.LIST} component={List}/>
				<Route path={PATHS.REPORT} component={Report}/>
				<Route path={PATHS.SETTINGS} component={Settings}/>
				<Route path={PATHS.TROUBLESHOOT} component={Troubleshoot}/>
				<Route path={PATHS.PROFILE} component={Profile}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('mount')
);
