'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import SalinityGraph from './graphs/SalinityGraph';

class SalinityGraphWrapper extends Component {
    render(){
        const { salinity, threshold } = this.props,
            hideWarning = salinity < threshold,
            warningSpriteClass = classNames([
                'sprite-wrapper',
                { hide : hideWarning },
            ]);
        return (
            <div className='salinity-graph-wrapper'>
                <div>
                    <div className={warningSpriteClass}>
                        <div className='sprite warning'></div>
                    </div>
                    <SalinityGraph salinity={salinity} threshold={threshold}/>
                </div>
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
