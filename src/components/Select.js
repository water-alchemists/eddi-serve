'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class Select extends Component {
	_renderOptions(){
		const { options } = this.props;
	}
	render(){
		return (
			<select>
			</select>
		);
	}
}

Select.propTypes = {
	options : PropTypes.arrayOf(
		PropTypes.oneOf([
			PropTypes.shape({
				display : PropTypes.string.isRequired,
				value : PropTypes.any
			}),
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		])
	).isRequired,
	onChange : PropTypes.func.isRequired
};

export default Select;