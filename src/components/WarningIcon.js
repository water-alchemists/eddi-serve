'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class WarningIcon extends Component {

    render(){
        return (
            <div className='warning-icon sprite circle'>
                <p>!</p>
            </div>
        );
    }
}

WarningIcon.propTypes = {

};

export default WarningIcon;