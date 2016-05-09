'use strict';
const isProduction = process.env.PRODUCTION === 'production',
    prodConfig = require('./production'),
    devConfig = require('./development'),
    baseConfig = { production : isProduction },
    actualConfig = Object.assign(
                        baseConfig, 
                        isProduction ? prodConfig : devConfig
                    );
    
module.exports = actualConfig;