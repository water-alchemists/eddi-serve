'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatDateToPretty } from '../data'; 

class WeatherOverview extends Component {
    render(){
        const { time, temperature, type, location, image } = this.props;
        const formattedTime = formatDateToPretty(time),
            formattedTemp = Math.floor(temperature);
        return (
            <div className='weather-overview'>
                <h3 className='weather-location'>{location}</h3>
                <div className='overview-content'>
                    <div className='image-container'>
                        <span className='icon' data-icon={image}></span>
                    </div>
                    <div className='overview-info'>
                        <p className='temperature'>
                            {`${formattedTemp}`}
                            <span className='icon' data-icon='+'></span>
                        </p>
                        <p className='weather-type'>{type}</p>
                        <p className='weather-updated'>{`as of ${formattedTime}`}</p>
                    </div>
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
