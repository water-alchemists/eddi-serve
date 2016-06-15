'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import SalinityGraph from './graphs/SalinityGraph';

class SalinityGraphWrapper extends Component {
    render(){
        const { salinity, threshold } = this.props;
        return (
            <div className='salinity-graph-wrapper'>
                <SalinityGraph salinity={salinity} threshold={threshold}/>
            </div>
        );
    }
}

SalinityGraphWrapper.propTypes = {
    salinity : PropTypes.number.isRequired,
    threshold : PropTypes.number.isRequired
};

SalinityGraphWrapper.defaultProps = {
    salinity : 0,
    threshold : 2000
}

export default SalinityGraphWrapper;
