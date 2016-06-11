'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { formatDegreeToDirection } from '../data';

class WeatherTable extends Component {
    _renderRain(){
        const { rain } = this.props,
            time = Object.keys(rain)[0],
            height = time ? rain[time] : undefined,
            text = height ? `${height} inches` : 'None';

        return (
            <tr>
                <td>Rain</td>
                <td>{text}</td>
            </tr>
        );
    }

    _renderSnow(){
        const { snow } = this.props,
            time = Object.keys(snow)[0],
            height = time ? snow[time] : undefined,
            text = height ? `${height} inches`: 'None';

        return (
            <tr>
                <td>Snow</td>
                <td>{text}</td>
            </tr>
        )
    }

    _renderHumidity(){
        const { humidity } = this.props;
        return (
            <tr>
                <td>Humidity</td>
                <td>{`${humidty}%`}</td>
            </tr>
        )
    }

    _renderWind(){
        const { wind } = this.props,
            direction = formatDegreeToDirection(wind.deg);

        return (
            <tr>
                <td>Wind</td>
                <td>{`${direction}(${wind.speed} miles/hour)`}</td>
            </tr>
        )
    }

    _renderDate(date, type){
        const text = formatDateToTime(date);
        return (
            <tr>
                <td>{type}</td>
                <td>{text}</td>
            </tr>
        )
    }

    render(){
        const { highTemp, lowTemp, sunrise, sunset } = this.props;
        return (
            <div className='weather-table'>
                <table>
                    { this._renderRain() }
                    { this._renderSnow() }
                    { this._renderHumidity() }
                    { this._renderWind() }
                    <tr>
                        <td>High</td>
                        <td>{`${highTemp} F`}</td>
                    </tr>
                    <tr>
                        <td>Low</td>
                        <td>{`${lowTemp} F`}</td>
                    </tr>
                    { this._renderDate(sunrise, 'Sunrise')}
                    { this._renderDate(sunset, 'Sunset') }
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
    snow : PropType.shape({
        '1h' : PropTypes.number,
        '2h' : PropTypes.number,
        '3h' : PropTypes.number
    }),
    humidity : PropTypes.number.isRequired,
    wind : PropTypes.shape({
        speed : PropTypes.number,
        deg : PropTypes.number
    }),
    highTemp : PropTypes.number.isRequired,
    lowTemp : PropTypes.number.isRequired,
    sunrise : PropTypes.instanceOf(Date),
    sunset : PropTypes.instanceOf(Date)
};

export default WeatherTable;
