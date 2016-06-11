'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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
        const { weather, zip } = this.props,
            main = weather.weather[0],
            image = createImageUrl(main.icon),
            location = createLocation(weather.name, sys.country, zip),
            updated = new Date(weather.dt),
            sunriseDate = new Date(weather.sys.sunrise),
            sunsetDate = new Date(weather.sys.sunset);

        return (
            <div className='weather-summary'>
                <WeatherOverview image={image}
                    location={location}
                    temperature={weather.main.temp}
                    type={main.main}
                    time={updated}
                />
                <WeatherTable rain={weather.rain}
                    snow={weather.snow}
                    humidity={weather.main.humidity}
                    wind={weather.wind}
                    highTemp={weather.main.temp_max}
                    lowTemp={weather.main.temp_min}
                    sunrise={sunriseDate}
                    sunsetDate={sunsetDate}
                />
            </div>
        );
    }
}

WeatherSummary.propTypes = {
    weather : PropTypes.object.isRequired,
    zip : PropTypes.number.isRequired
};

export default WeatherSummary;

