'use strict';
const express = require('express'),
    path = require('path');

const config = require('./config'),
    middleware = require('./middleware'),
    api = require('./api');

const PORT = process.env.PORT || 3000;

const app = express();

// transfer the env keys into the app
Object.keys(config).forEach(key => app.set(key, config[key]));

app.set('root', path.resolve(__dirname, '../'));

middleware(app);
api(app);

// properly sends 404 for any request for files with extensions
app.use((req, res, next) => {
    const hasExtension = path.extname(req.path).length > 0;
    hasExtension ? res.status(404).end() : next(null);
});

// returns the index html
app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

// handles errors
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));