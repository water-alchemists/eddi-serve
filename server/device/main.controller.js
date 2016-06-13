'use strict';
'use strict';
const express = require('express');

const eddiFire = require('../modules/firebase'),
    weatherApi = require('../modules/weather');
    
const router = express.Router();

const KEYS = {
    state : 'state',
    updated : 'updated',
    reason : 'reason'
},
INFO = {
    flowOut : 'qOut',
    flowRec : 'qDump',
    salinityIn : 'ppmIn',
    salinityOut : 'ppmOut',
    salinityRec : 'ppmRec'
},
RESPONSE = {
    state : 'running',
    reason : 'reason'
};

const REASON = {
    override : 'override',
    schedule : 'schedule',
    weather : 'weather',
    threshold : 'threshold'
};

//checks to see if the current time is within scheduled time
function checkTime(start, end){
  const startTime = new Date(),
    endTime = new Date(),
    current = new Date();

    //set start date
    startTime.setHours(start.hour);
    startTime.setMinutes(start.minute);

    //set end date
    endTime.setHours(end.hour);
    endTime.setMinutes(end.minute);
    
    console.log('endTime', endTime, 'startTime', startTime, 'currentTime', current, 'result', current < endTime && current >= startTime);
    
  return current < endTime && current >= startTime;
}

// checks if over salinity threshold
function checkBelowThreshold(threshold, salinityIn){
    console.log('salinityIn', salinityIn, 'threshold', threshold, 'below?', salinityIn < threshold);
    return salinityIn < threshold;
}

// checks if raining
function isRaining(volume){
    console.log('rain volume', volume, 'is raining?', volume > 0.3);
    return volume > 0.3;
}

module.exports = app => {
    const WEATHER_KEY = app.get('WEATHER_KEY'),
        WEATHER_URL = app.get('WEATHER_URL');
    
    const weather = weatherApi(WEATHER_URL, WEATHER_KEY);
    
    router.get('/:id', (req, res, next) => {
        // handles request by eddi for whether it should currently be running

        const id = req.params.id,
            date = new Date();

        /*
            Priority
            1. Manual Override
            2. Schedule - Within time = On, Outside time = Off
            3. Weather - Rain Volume > 0.3 = Off, else On
            4. Salinity Threshold - Recent Salinity < Threshold = Off, else On             
        */
        
        const getSettings = eddiFire.getSettingsById(id),
            getReadings = eddiFire.getCurrentReadingById(id);
            
        return Promise.all([getSettings, getReadings])
            .then(data => {
                const settings = data[0] || {},
                    reading = data[1] || {},
                    state = settings.state,
                    timing = settings.timing,
                    zip = settings.zip,
                    isBelowThreshold = checkBelowThreshold(settings.salinity, reading.ppmIn);
                
                if(state === 0){
                    // 1. Manual Override Off
                    return res.status(200).json({ 
                        [RESPONSE.state] : false, 
                        [RESPONSE.reason] : REASON.override 
                    });
                }
                else if(state === 1){
                    // 1. Manual Override On
                    return res.status(200).json({
                        [RESPONSE.state] : true,
                        [RESPONSE.reason] : REASON.override
                    });
                }                                     
                else if(!checkTime(timing.start, timing.end)) {
                    // 2. Schedule
                    return res.status(200).json({ 
                        [RESPONSE.state] : false, 
                        [RESPONSE.reason] : REASON.schedule 
                    }); 
                }
                else if(!zip) {
                    if(isBelowThreshold) {
                        // 4. Salinity Threshold
                        return res.status(200).json({ 
                            [RESPONSE.state] : false, 
                            [RESPONSE.reason] : REASON.threshold 
                        }); 
                    }
                    else {
                        // default is to have it ON
                        return res.status(200).json({ 
                            [RESPONSE.state] : true, 
                            [RESPONSE.reason] : REASON.schedule 
                        }); 
                    }
                }
                else return weather.getJsonByZip(zip)
                        .then(current => {
                            const rain = current.rain || {},
                                duration = Object.keys(rain)[0],
                                volume = duration ? rain[duration] : 0;
                            console.log('got weather reading', current, 'duration', duration, 'volume', volume);
                            if(isRaining(volume)) {
                                console.log('weather check says its raining');
                                // 3. Weather
                                return res.status(200).json({ 
                                    [RESPONSE.state] : false, 
                                    [RESPONSE.reason] : REASON.weather
                                }); 
                            }
                            else if(isBelowThreshold) {
                                // 4. Salinity Threshold
                                return res.status(200).json({ 
                                    [RESPONSE.state] : false, 
                                    [RESPONSE.reason] : REASON.threshold 
                                }); 
                            }
                            else {
                                // default is to have it ON
                                return res.status(200).json({ 
                                    [RESPONSE.state] : true, 
                                    [RESPONSE.reason] : REASON.schedule 
                                }); 
                            }
                        });
            })
            .catch(err => next(err)); //if error processing the request
            
    });
    
    router.put('/:id', (req, res, next) => {
        // handles eddi updating the db of its current cycle
        const keys = [
            KEYS.state,
            KEYS.updated,
            KEYS.reason    
        ];
        
        const id = req.params.id,
            input = req.body,
            state = keys.reduce((accum, key) => {
                if(input[key]) accum[key] = input[key];
                return accum
            }, {});
        
        return eddiFire.updateStateById(id, state)
            .then(() => res.status(200).send())
            .catch(err => next(err));
    });

    router.post('/:id/readings', (req, res, next) => {
        // handles eddi adding to the db a new reading
        const keys = [
            INFO.flowOut,
            INFO.salinityIn,
            INFO.salinityOut,
            INFO.salinityRec
        ];

        const id = req.params.id,
            input = req.body,
            readings = keys.reduce((accum, key) => {
                if(input[key]) accum[key] = input[key];
                return accum
            }, {});

            return;
    })
    
    return router;
};