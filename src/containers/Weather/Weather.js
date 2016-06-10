'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	weatherClear,
    getWeatherByZipThunk
} from '../../actions/weather';

import { menuNameChange } from '../../actions/menu';

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
        // update the 
        if( eddi.settings.name ) updateMenuName(eddi.settings.name);
        else updateMenuName('Weather');
            
        const { zip } = eddi.settings;
        if(zip) getWeatherByZip(zip);

    }
    componentWillReceiveProps(nextProps){
        const { eddi={}, getWeatherByZip } = this.props,
            { settings={} } = eddi,
            { zip:oldZip } = settings,
            { zip:newZip } = nextProps.eddi.settings;

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
            <div>
                {`This eddi got a location : ${zip}`}
                <div>{JSON.stringify(weather)}</div>
            </div>
            
        );
    }

    render(){
        const { eddi={} } = this.props,
            { zip } = eddi.settings;
        return (
            <div id="weather" className="page">
                { zip ? this._renderWeather() : this._renderNone() }
            </div>
        );
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Weather);




