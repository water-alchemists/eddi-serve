'use strict';
const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');
    
module.exports = app => {
    
    //static middleware
    app.use(express.static(path.resolve(__dirname, '../../bower_components')));
    app.use(express.static(path.resolve(__dirname, '../../node_modules')))
    app.use('/assets', express.static(path.resolve(__dirname, '../../assets')));
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.use(favicon(path.resolve(__dirname, '../views/favicon.ico')));
    
    //parses form data
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
    
};