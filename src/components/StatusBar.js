'use strict';
import React, { Component, PropTypes } from 'react';

import EddiStateButton from './EddiStateButton';

function renderReason(reason, state){
    switch(reason){
    case 'override':
        let stateText;
        if(state === 0) stateText = 'manual off';
        else if(state === 1) stateText = 'manual on';
        else stateText = 'auto';
        
        return `machine is set to ${stateText}`;
    case 'schedule':
        return 'machine is running on schedule';
    case 'weather':
        return 'rain volume is greater than 0.5';
    case 'initialize':
        return 'machine is starting up';
    default : 
        return "of reasons I can't understand";
    }
}

class StatusBar extends Component {
    render(){
        const { isOn, state, reason, onClick } = this.props,
            stateText = isOn ? 'on' : 'off',
            reasonText = renderReason(reason, state);
        return (
            <div class='status'>
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