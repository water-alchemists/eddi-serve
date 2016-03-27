'use strict';
import React, { Component, PropTypes } from 'react';
import { salinityOptions } from '../data';

class SalinityInput extends Component {
	constructor(props){
		super(props);
		const { value } = this.props;
		this.state = {
			value : null
		};
	}

	componentWillReceiveProps(nextProps){
		const { value } = nextProps;
		this.setState({ value });
	}

	changeHandler(event){
		event.preventDefault();
		console.log('at change handler', event.target.value);
		const value = event.target.value;
		this.setState({ value });
	}

	blurHandler(event){
		event.preventDefault();
		const { onSalinityChange } = this.props,
			value = event.target.value,
			formattedValue = !isNaN(Number(value)) ? parseInt(value) : null;

		if(onSalinityChange instanceof Function) return onSalinityChange(formattedValue);
	}

	render(){
		const { placeholder } = this.props,
			{ value } = this.state;
		return (
			<div className='salinity-input'>
				<input type='number'
					onChange={event => this.changeHandler(event)}
					value={value}
					placeholder={placeholder}
					pattern='[0-9]*'
					onBlur={event => this.blurHandler(event)}
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
	]),
	placeholder : PropTypes.string
};

SalinityInput.defaultProps = {
	value : salinityOptions.default,
	placeholder : 'Set Your Own'
}

export default SalinityInput;