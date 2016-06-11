'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import WeatherOverview from './WeatherOverview';
import WeatherTable from './WeatherTable';

class WeatherSummary extends Component {
    render(){
        return (
            <div className='weather-summary'>
                <WeatherOverview />
                <WeatherTable />
            </div>
        );
    }
}

WeatherSummary.propTypes = {

};

export default WeatherSummary;

