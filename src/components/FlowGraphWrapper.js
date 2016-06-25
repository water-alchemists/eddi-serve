'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import FlowGraph from './graphs/FlowGraph';
import { isGoodFlow } from '../data';

class FlowGraphWrapper extends Component {
    render(){
        const { rate } = this.props,
            hideWarning = isGoodFlow(rate),
            warningSpriteClass = classNames([
                'sprite-wrapper',
                { hide : hideWarning },
            ]);
        return (
            <div className='flow-graph-wrapper'>
                <div>
                    <div className={warningSpriteClass}>
                        <div className='sprite small warning'></div>
                    </div>
                    <FlowGraph rate={rate}/>
                </div>
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