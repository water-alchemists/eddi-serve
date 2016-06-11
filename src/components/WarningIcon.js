'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class WarningIcon extends Component {
    render(){
        const { show } = this.props;
        if(!show) return null;
        return (
            <div className='warning-icon sprite circle'>
                <p>!</p>
            </div>
        );
    }
}

WarningIcon.propTypes = {
    show : PropTypes.bool.isRequired
};

WarningIcon.defaultProps = {
    show : true
};

export default WarningIcon;