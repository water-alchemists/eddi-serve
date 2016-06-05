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
    return volume && volume > 0.5;
}

module.exports = app => {
    const WEATHER_KEY = app.get('WEATHER_KEY'),
        WEATHER_URL = app.get('WEATHER_URL');
    
    const weather = weatherApi(WEATHER_URL, WEATHER_KEY);
    
    router.get('/:id', (req, res, next) => {
        const id = req.params.id,
            date = new Date();

        /*
            Priority
            1. Manual Override
            2. Schedule - Within time = On, Outside time = Off
            3. Weather - Rain Volume > 0.5 = Off, else On
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
                    isBelowThreshold = checkBelowThreshold(settings.salinity, reading.ppmIn);
               console.log('this is a reading', reading);
                
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
                else if(!settings.zip) {
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
                else return weather.getJsonByZip(settings.zip)
                        .then(current => {
                            const rain = current.rain || {},
                                volume = rain['3h'];
                            if(isRaining(volume)) {
                                // 3. Weather
                                return res.status(200).json({ 
                                    [RESPONSE.state] : false, 
                                    [RESPONSE.reason] : REASON.threshold 
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
    
    return router;
};