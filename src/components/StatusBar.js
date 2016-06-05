'use strict';
import React, { Component, PropTypes } from 'react';

import EddiStateButton from './EddiStateButton';

import style from '../less/StatusBar.less';

function renderReason(reason, state){
    switch(reason){
    case 'override':
        let stateText;
        if(state === 0) stateText = 'manual off';
        else if(state === 1) stateText = 'manual on';
        else stateText = 'auto';
        
        return `eddi is set to ${stateText}`;
    case 'schedule':
        return 'eddi is running on schedule';
    case 'weather':
        return 'rain volume is greater than 0.3';
    case 'initialize':
        return 'eddi is starting up';
    default : 
        return "of reasons I can't understand";
    }
}

class StatusBar extends Component {
    render(){
        const { isOn, state, reason, onClick } = this.props,
            stateText = isOn ? 'ON' : 'OFF',
            reasonText = renderReason(reason, state);
        return (
            <div className='status-bar'>
                <p>{`Currently is ${stateText} because ${reasonText}.`}</p>
                <EddiStateButton onClick={state => onClick(state)}
                    value={state}
                />
            </div>  
        );
    }
}

StatusBar.propTypes = {
    isOn : PropTypes.bool.isRequired,
    reason : PropTypes.string.isRequired,
    onClick : PropTypes.func,
    state : PropTypes.number.isRequired
};

export default StatusBar;