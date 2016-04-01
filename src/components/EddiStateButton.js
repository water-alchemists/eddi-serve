'use strict';
import React, { Component, PropTypes } from 'react';

import style from '../less/EddiStateButton.less';

class EddiStateButton extends Component {
	clickHandler(event, value, cb){
		event.preventDefault();
		if(cb instanceof Function) return cb(value);
	}

	_renderOff(){
		const { onClick } = this.props;
		return (
			<div className='eddi-state-button' 
				onClick={ event => this.clickHandler(event, 1, onClick) }
			>
				ON
			</div>
		);
	}

	_renderOn(){
		const { onClick } = this.props;

		return (
			<div className='eddi-state-button'
				onClick={ event => this.clickHandler(event, 0, onClick) }
			>
				OFF
			</div>
		);
	}
	render(){
		const { value } = this.props;
		return value ? this._renderOn() : this._renderOff();
	}
}

EddiStateButton.propTypes = {
	value : PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

export default EddiStateButton;