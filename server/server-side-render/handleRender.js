'use strict';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../../src/reducers';
import renderPage from './renderPage';
import fetchInitial from './fetchInitial';

function handleRender(req, res, next){
    const token = req.cookies.token;

    return fetchInitial(token)
        .then(data => {
            
        })
        .catch(err => next(err));
}

module.exports = handleRender;