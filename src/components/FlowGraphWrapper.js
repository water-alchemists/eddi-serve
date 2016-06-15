'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import FlowGraph from './graphs/FlowGraph';

class FlowGraphWrapper extends Component {
    render(){
        const { rate } = this.props;
        return (
            <div className='salinity-graph-wrapper'>
                <FlowGraph rate={rate}/>
            </div>
        );
    }
}

FlowGraphWrapper.propTypes = {
    rate : PropTypes.number.isRequired
};

FlowGraphWrapper.defaultProps = {
    rate : 0
};

export default FlowGraphWrapper;