'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatUTCtoDate, checkNight, getWeatherFont } from '../data';

import WeatherOverview from './WeatherOverview';
import WeatherTable from './WeatherTable';

function createImageUrl(code, sunrise, sunset){
    const isNight = checkNight(sunrise, sunset);
    return getWeatherFont(code, isNight);
}

function createLocation(city, country, zip){
    return `${city}, ${country} ${zip}`;
}

class WeatherSummary extends Component {
    render(){
        const { weather={}, zip } = this.props,
            { sys={}, dt, main={}, wind={}, snow={}, rain={}, name } = weather,
            description = weather.weather[0],
            location = createLocation(name, sys.country, zip),
            updated = formatUTCtoDate(dt),
            sunriseDate = formatUTCtoDate(sys.sunrise),
            sunsetDate = formatUTCtoDate(sys.sunset),
            image = createImageUrl(description.id, sunriseDate, sunsetDate);

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

