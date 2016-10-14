'use strict';
const swale = require('../server/modules/swale');

swale.get()
    .then(data => console.log('got data :', data))
    .catch(error => console.error('got error :', error));