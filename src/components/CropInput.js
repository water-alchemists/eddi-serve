'use strict';
import React, { Component, PropTypes } from 'react';

import { crops } from '../data';

import style from '../less/CropInput.less';

class CropInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			index : null
		};
	}

	changeHandler(event){
		event.preventDefault();
		const { onChange } = this.props,
			index = event.target.value,
			crop = Object.assign({}, crops[index]);

		if(onChange instanceof Function) onChange(crop.value);
		this.setState({ index });
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
		const { index } = this.state;
		return (
			<div className='crop-input'>
				<select value={index} 
					onChange={event => this.changeHandler(event)}
				>
					<option disabled selected value>PICK A CROP</option>
					{ this._renderOptions() }
				</select>
			</div>
		);
	}
}

CropInput.propTypes = {
	onChange : PropTypes.func
};

export default CropInput;