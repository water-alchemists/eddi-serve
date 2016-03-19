'use strict';
import React, { Component, PropTypes } from 'react';
import { salinityOptions } from '../data';

class SalinityInput extends Component {
	changeHandler(event){
		event.preventDefault();
		const { onSalinityChange } = this.props,
			value = event.target.value,
			formattedValue = isNaN(Number(value)) ? parseInt(value) : null;

		if(onSalinityChange instanceof Function) return onSalinityChange(formattedValue);
	}

	render(){
		const { value } = this.props;
		return (
			<div className='salinity-input'>
				<input type='number'
					onChange={event => this.changeHandler(event)}
					value={value}
					placeholder='Set Your Own'
				/>
			</div>
		);
	}
}

SalinityInput.propTypes = {
	onSalinityChange : PropTypes.func,
	value : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

SalinityInput.defaultProps = {
	value : salinityOptions.default
}

export default SalinityInput;