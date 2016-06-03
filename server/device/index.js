'use strict';
const mainRouter = require('./main.controller');
const router = require('express').Router();

module.exports = app => {
    router.use('/', mainRouter(app));
    
    return router;
};