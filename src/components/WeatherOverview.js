'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatDateToPretty } from '../data'; 

class WeatherOverview extends Component {
    render(){
        const { time, temperature, type, location, image } = this.props;
        const formattedTime = formatDateToPretty(time);
        return (
            <div className='weather-overview'>
                <div className='image-container'>
                    <img src={image}></img>
                </div>
                <div>
                    <p className='weather-location'>{location}</p>
                    <p className='temperature'>{`${temperature} F`}</p>
                    <p className='weather-type'>{type}</p>
                    <p className='weather-updated'>{`as of ${formattedTime}`}</p>
                </div>
            </div>
        );
    }
}

WeatherOverview.propTypes = {
    image : PropTypes.string.isRequired,
    location : PropTypes.string.isRequired,
    temperature : PropTypes.number.isRequired,
    type : PropTypes.string.isRequired,
    time : PropTypes.instanceOf(Date)
};

export default WeatherOverview;
