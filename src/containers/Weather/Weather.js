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
    constructor(props){
        super(props);
        this.state = {
            zip : null
        };
    }

    componentWillMount(){
        const { updateMenuName, getWeatherByZip, eddi={}, weather={} } = this.props;
        
        if( eddi.settings ) {
            updateMenuName(eddi.settings.name);
            const zip = eddi.settings.zip;
            this.state.zip = zip;
            if(zip) getWeatherByZip(zip);
        }
        else updateMenuName('Weather');
    }
    componentWillReceiveProps(nextProps){
        const { zip } = this.state,
            { selected={} } = nextProps.eddi;
        if(selected.zip && selected.zip != zip) getWeatherByZip(zip);
        this.setState({ zip: selected.zip }); 
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
        const { zip } = this.state;
        return(
            <div>{`This eddi got a location : ${zip}`}</div>
        );
    }

    render(){
        const { zip } = this.state;
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




