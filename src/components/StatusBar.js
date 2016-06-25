'use strict';
import React, { Component, PropTypes } from 'react';

import EddiStateButton from './EddiStateButton';

import style from '../less/StatusBar.less';

function setStateText(state){
	switch(state){
	case 0 :
		return 'OFF';
	case 1 : 
		return 'ON';
	default : 
		return 'AUTO';
	};
}

function renderReason(reason, state){
    switch(reason){
    case 'override':
        const stateText = setStateText(state);
        return `eddi is set to ${stateText}`;
    case 'schedule':
        return 'eddi is running on schedule';
    case 'threshold':
        return 'salinity of the incoming water is less than the set threshold';
    case 'weather':
        return 'it is raining';
    case 'initialize':
        return 'eddi is starting up...';
    case 'exit':
        return 'eddi has exited';
    default : 
        return "of reasons I can't understand";
    }
}

class StatusBar extends Component {
    _renderInitialize(){
        return (
          <div className='status-bar'>
            <p>Fetching the status of your eddi...</p>
          </div>  
        );    
    }
    
    _renderStatus(){
        const { state, current, reason } = this.props,
            stateText = setStateText(state),
            isOn = !!current,
            onText = isOn ? 'ON' : 'OFF',
            reasonText = renderReason(reason, state);

        if(state != 2 && !!state != isOn){ 
            // if pending override to take over, show this pending state change text to user
            return (
                <p id="state">{`Turning your EDDI ${stateText}...`}</p>
            );
        }
        else {
            return (
                <p>{`Currently is ${onText} because ${reasonText}.`}</p>
            );
        }
    }
    
    _renderFetch(){
        const { state, onClick } = this.props,
            StatusElement = this._renderStatus();
        return (
            <div className='status-bar'>
                { StatusElement }
                <EddiStateButton onClick={state => onClick(state)}
                    value={state}
                />
            </div>  
        );
    }
    
    render(){
        const { current, state, reason } = this.props,
            StatusBarElement = state === null ? this._renderInitialize() : this._renderFetch();
        return StatusBarElement;
    }
}

StatusBar.propTypes = {
    reason : PropTypes.string,
    onClick : PropTypes.func,
    state : PropTypes.number,
    current : PropTypes.number
};

StatusBar.defaultProps = {
    current : 0
}

export default StatusBar;