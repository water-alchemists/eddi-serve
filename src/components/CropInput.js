'use strict';
import React, { Component, PropTypes } from 'react';

import { crops } from '../data';

import style from '../less/CropInput.less';

const initialState = {
	index : null,
	display : null,
	value : null
}

class CropInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			...initialState
		};
	}

	componentWillReceiveProps(nextProps){
		// if the value was changed somewhere else, reset this
		// const { value } = this.state;
		// console.log('value', value, 'nextporps', nextProps.value, nextProps.value && nextProps.value !== value);
		// if(value && nextProps.value !== value) return this.setState({ ... initialState });
	}

	changeHandler(event){
		event.preventDefault();
		const { onChange } = this.props,
			index = event.target.value,
			crop = Object.assign({}, crops[index]),
			newState = Object.assign({ index }, crop);

		if(onChange instanceof Function) onChange(crop.value);
		this.setState(newState);
	}

	_renderOptions(){
		return crops.map((crop, i) => {
			return (
				<option value={i} key={crop.display}>
					{ crop.display }
				</option>
			);
		})
	}

	render(){
		const { index } = this.state,
			defaultOptionProps = {
				disabled : true,
				selected : !index,
				value : null
			};

		return (
			<div className='crop-input'>
				<select value={index} 
					onChange={event => this.changeHandler(event)}
				>
					<option {...defaultOptionProps} >PICK A CROP</option>
					{ this._renderOptions() }
				</select>
			</div>
		);
	}
}

CropInput.propTypes = {
	onChange : PropTypes.func,
	value : PropTypes.number
};

export default CropInput;