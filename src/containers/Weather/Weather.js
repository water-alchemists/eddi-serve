'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	weatherClear,
    getWeatherByZipThunk
} from '../../actions/weather';

import { menuNameChange } from '../../actions/menu';


import EddiStateButton from '../../components/EddiStateButton';
import StatusBar from '../../components/StatusBar';


import WeatherSummary from '../../components/WeatherSummary';




import style from './Weather.less';

function mapStateToProps(state){
	return {
		eddi : state.selected,
        weather : state.weather
	};
}

function mapDispatchToProps(dispatch){
	return {
		clearWeather : () => dispatch(weatherClear()),
        getWeatherByZip : zip => dispatch(getWeatherByZipThunk(zip)),
        updateMenuName:	(name) => dispatch(menuNameChange(name)),
	};
}

class Weather extends Component {
    componentWillMount(){
        const { updateMenuName, getWeatherByZip, eddi={} } = this.props;
        // update the name
        if( eddi.settings.name ) updateMenuName(eddi.settings.name);
        else updateMenuName('Weather');
            
        const { zip } = eddi.settings;
        if(zip) getWeatherByZip(zip);

    }
    componentWillReceiveProps(nextProps){
        const { eddi={}, getWeatherByZip, updateMenuName } = this.props,
            { settings={} } = eddi,
            { zip:oldZip } = settings,
            { zip:newZip, name } = nextProps.eddi.settings;

        // update the name
        if( name ) updateMenuName(name);
        else updateMenuName('Weather');

        if(oldZip != newZip && newZip) getWeatherByZip(newZip);
    }

    componentWillUnmount(){
        const { clearWeather } = this.props;
        clearWeather();
    }

    _renderNone(){
        return (
            <div>This eddi's location currently has not been provided.</div>
        );
    }

    _renderWeather(){
        const { eddi={}, weather={} } = this.props,
            { zip } = eddi.settings;
        return(
            <WeatherSummary weather={weather}
                zip={zip}
            />
        );
    }

    render(){
        const { eddi={}, weather={} } = this.props,
            { zip } = eddi.settings,
            WeatherElement = weather.id ? this._renderWeather() : this._renderNone();
        return (
            <div id="weather" className="page">
                { WeatherElement }
            </div>
        );
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Weather);




