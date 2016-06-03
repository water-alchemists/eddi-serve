'use strict';
const Firebase = require('firebase');

const PATHS = {
    BASE_PATH : 'https://eddi.firebaseio.com/eddis',
    SETTINGS : 'settings',
    STATE : 'state',
    SALINITY : 'salinity',
    READINGS : 'readings',
    TIMING : 'timing',
    HOUR : 'hour',
    MINUTE : 'minute', 
    START_TIME : 'start',
    END_TIME : 'end'
};

const fire = new Firebase(PATHS.BASE_PATH);

function getSettingsById(id){
    return new Promise((resolve, reject) => {
        fire.child(id)
            .child(PATHS.SETTINGS)
            .once(
                'value', 
                snapshot => {
                    const eddi = snapshot.val();
                    if(!eddi) return reject(new Error(`Eddi machine ${id} does not exist.`));
                    resolve(eddi);
                },
                reject
            );
    });
}

function getCurrentReadingById(id){
    return new Promise((resolve, reject) => {
        fire.child(id)
            .child(PATHS.READINGS)
            .orderByKey()
            .limitToLast(1)
            .once(
                'value',
                snapshot => {
                    const value = snapshot.val();
                    resolve(value);
                },
                reject
            );
    });
}

function updateStateById(id, state){
    return new Promise((resolve, reject) => {
        fire.child(id)
            .child(PATHS.STATE)
            .set(
                state,
                err => {
                    if(err) return reject(err);
                    resolve();
                }
            );
    });
}

module.exports = {
    getSettingsById : getSettingsById,
    getCurrentReadingById : getCurrentReadingById,
    updateStateById : updateStateById
};

// getSettingsById('test-teddi')
//     .then(data => console.log('got data', data))
//     .catch(err => console.error('error', err));