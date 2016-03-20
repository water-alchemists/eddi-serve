'use strict';
import React, { Component, PropTypes } from 'react';

class EddiStateButton extends Component {
	clickHandler(event, value, cb){
		event.preventDefault();
		if(cb instanceof Function) return cb(value);
	}

	_renderOff(){
		const { onClick } = this.props;
		return (
			<button onClick={ event => this.clickHandler(event, 1, onClick) }
				type='button'
			>
				ON
			</button>
		);
	}

	_renderOn(){
		const { onClick } = this.props;

		return (
			<button onClick={ event => this.clickHandler(event, 0, onClick) }
				type='button'
			>
				OFF
			</button>
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