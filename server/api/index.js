'use strict';
const weatherRouter = require('./weather'),
    eddiRouter = require('./eddi');

const router = require('express').Router();

module.exports = app => {
    router.use('/weather', weatherRouter(app));
    router.use('/eddi', eddiRouter(app));

    return router;
};