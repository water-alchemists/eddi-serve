'use strict';
const weatherRouter = require('./weather.controller');

module.exports = app => {
    app.use('/weather', weatherRouter(app));
};