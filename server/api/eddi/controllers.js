'use strict';
const firebaseApi = require('../../modules/firebase');
    
function getById(app, req, res, next){
    const ID = req.params.id;
    
    const promise = firebaseApi.getCurrentReadingById(id);

    return promise
              .then(data => res.status(200).json(data))
              .catch(next);
};

module.exports = {
  getById : getById
};