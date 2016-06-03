'use strict';
'use strict';
const express = require('express');

const eddiFire = require('../modules/firebase'),
    weather = require('../modules/weather');
    
const router = express.Router();
    
module.exports = app => {
    router.get('/:id', (req, res, next) => {
        
    });
    
    router.put('/:id', (req, res, next) => {
        
    });
    
    return router;
};