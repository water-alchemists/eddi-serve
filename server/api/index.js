'use strict';
const weatherRouter = require('./weather.controller');
const router = require('express').Router();

module.exports = app => {
    router.use('/weather', weatherRouter(app));
    
    return router;
};