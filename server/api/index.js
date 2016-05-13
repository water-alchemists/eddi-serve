'use strict';
const weatherRouter = require('./weather.controller');

module.exports = app => {
    app.use('/api/weather', weatherRouter(app));
};