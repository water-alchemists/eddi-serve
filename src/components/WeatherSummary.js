'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatUTCtoDate } from '../data';

import WeatherOverview from './WeatherOverview';
import WeatherTable from './WeatherTable';

function createImageUrl(icon){
    return `http://openweathermap.org/img/w/${icon}.png`
}

function createLocation(city, country, zip){
    return `${city}, ${country} ${zip}`;
}

class WeatherSummary extends Component {
    render(){
        const { weather={}, zip } = this.props,
            { sys={}, dt, main={}, wind={}, snow={}, rain={}, name } = weather,
            description = weather.weather[0],
            image = createImageUrl(description.icon),
            location = createLocation(name, sys.country, zip),
            updated = formatUTCtoDate(dt),
            sunriseDate = formatUTCtoDate(sys.sunrise),
            sunsetDate = formatUTCtoDate(sys.sunset);
            
        return (
            <div id='weather-summary'>
                <WeatherOverview image={image}
                    location={location}
                    temperature={main.temp}
                    type={description.main}
                    time={updated}
                />
                <WeatherTable rain={rain}
                    snow={snow}
                    humidity={main.humidity}
                    wind={wind}
                    highTemp={main.temp_max}
                    lowTemp={main.temp_min}
                    sunrise={sunriseDate}
                    sunsetDate={sunsetDate}
                />
            </div>
        );
    }
}

WeatherSummary.propTypes = {
    weather : PropTypes.object.isRequired,
    zip : PropTypes.string.isRequired
};

export default WeatherSummary;

