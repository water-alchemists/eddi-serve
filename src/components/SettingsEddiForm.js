'use strict';
import React, { Component, PropTypes } from 'react';
import SalinityInput from './SalinityInput';

class SettingsEddiForm extends Component {
	render(){
		const { 
			salinityValue, 
			startValue, 
			endValue, 
			onSalinityChange, 
			onStartChange, 
			onEndChange 
		} = this.props;

		return (
			<div>
				<SalinityInput value={salinityValue}
					onSalinityChange={salinity => onSalinityChange(salinity)}
				/>
			</div>
		);
	}
}

SettingsEddiForm.propTypes = {
	onSalinityChange : PropTypes.func.isRequired,
	onStartChange : PropTypes.func.isRequired,
	onEndChange : PropTypes.func.isRequired,
	salinityValue : PropTypes.number,
	startValue : PropTypes.number, 
	endValue : PropTypes. number
};

export default SettingsEddiForm;