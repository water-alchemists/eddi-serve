'use strict';
const express = require('express');

const controllers = require('./controllers');

module.exports = app => {
    const router = express.Router();
    
    router.get('/', controllers.get.bind(null, app));

    router.use((req, res) => res.sendStatus(404));
    
    return router;
};