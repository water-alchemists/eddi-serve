'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatDegreeToDirection, formatDateToTime } from '../data';

class WeatherTable extends Component {
    _renderRain(){
        const { rain } = this.props,
            keys = Object.keys(rain),
            time = keys.length ? keys[0] : undefined,
            height = time ? rain[time] : undefined,
            text = height ? `${height} inches` : 'None';

        return (
            <tr>
                <td className='label'>
                    <p>Rain</p>
                </td>
                <td className='value'>
                    <p>{text}</p>
                </td>
            </tr>
        );
    }

    _renderSnow(){
        const { snow } = this.props,
            keys = Object.keys(snow),
            time = keys.length ? keys[0] : undefined,
            height = time ? snow[time] : undefined,
            text = height ? `${height} inches`: 'None';

        return (
            <tr>
                <td className='label'>
                    <p>Snow</p>
                </td>
                <td className='value'>
                    <p>{text}</p>
                </td>
            </tr>
        )
        
    }

    _renderHumidity(){
        const { humidity } = this.props;
        return (
            <tr>
                <td className='label'>
                    <p>Humidity</p>
                </td>
                <td className='value'>
                    <p>{`${humidity}%`}</p>
                </td>
            </tr>
        );
    }


    _renderWind(){
        const { wind } = this.props,
            direction = formatDegreeToDirection(wind.deg);

        return (
            <tr>
                <td className='label'>
                    <p>Wind</p>
                </td>
                <td className='value'>
                    <p>{`${direction} (${wind.speed} miles/hour)`}</p>
                </td>
            </tr>
        )
        
    }

    _renderDate(date, type){
        const text = formatDateToTime(date);
        return (
            <tr>
                <td className='label'>
                    <p>{type}</p>
                </td>
                <td className='value'>
                    <p>{text}</p>
                </td>
            </tr>
        );
    }

    _renderTemp(temp, type){
        const rounded = Math.floor(temp);
        return (
            <tr>
                <td className='label'>
                    <p>{type}</p>
                </td>
                <td className='value'>
                    <p>{`${rounded} F`}</p>
                </td>
            </tr>
        );
    }

    render(){
        const { highTemp, lowTemp, sunrise, sunset } = this.props;

        const RainElement = this._renderRain(),
            SnowElement = this._renderSnow(),
            HumidityElement = this._renderHumidity(),
            WindElement = this._renderWind(),
            HighElement = this._renderTemp(highTemp, 'High'),
            LowElement = this._renderTemp(lowTemp, 'Low'),
            SunriseElement = this._renderDate(sunrise, 'Next Sunrise'),
            SunsetElement = this._renderDate(sunset, 'Next Sunset');

        return (
            <div className='weather-table'>
                <table>
                    <tbody>
                        { RainElement }
                        { SnowElement }
                        { HumidityElement }
                        { WindElement }
                        { HighElement }
                        { LowElement }
                        { SunriseElement }
                        { SunsetElement }
                    </tbody>
                </table>
            </div>
        );
    }
}

WeatherTable.propTypes = {
    rain : PropTypes.shape({
        '1h' : PropTypes.number,
        '2h' : PropTypes.number,
        '3h' : PropTypes.number
    }),
    snow : PropTypes.shape({
        '1h' : PropTypes.number,
        '2h' : PropTypes.number,
        '3h' : PropTypes.number
    }),
    humidity : PropTypes.number,
    wind : PropTypes.shape({
        speed : PropTypes.number,
        deg : PropTypes.number
    }),
    highTemp : PropTypes.number,
    lowTemp : PropTypes.number,
    sunrise : PropTypes.instanceOf(Date),
    sunset : PropTypes.instanceOf(Date)
};

WeatherTable.defaultProps = {

}

export default WeatherTable;
