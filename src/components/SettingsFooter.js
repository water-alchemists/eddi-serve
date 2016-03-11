'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class SettingsFooter extends Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen : false
		};
	}

	_renderAddButton(){
		const { isOpen } = this.state;
	}

	submitHandler(value){
		const { onSubmit } = this.props;
		if(onSubmit instanceof Function) return onSubmit(value);
	}

	render(){
		return (
			<div>
			</div>
		);
	}
}

SettingsFooter.propTypes = {
	onSubmit : PropTypes.func.isRequired
};

export default SettingsFooter;