'use strict';
import React, { Component, PropTypes } from 'react';

import { salinityOptions } from '../data';

import SalinityInput from './SalinityInput';
import TimeSelect from './TimeSelect';

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
			<div className='settings-form'>
				<div className='operate-row'>
					<h4>OPERATING FROM</h4>
					<div className='select-container'>
						<TimeSelect onChange={ ({ hour, minute }) => onStartChange(hour, minute) }
							hour={startValue.hour}
							minute={startValue.minute}
						/>
						<p>TO</p>
						<TimeSelect onChange={ ({ hour, minute }) => onEndChange(hour, minute) }
							hour={endValue.hour}
							minute={endValue.minute}
						/>
					</div>
				</div>
				<div className='salinity-row'>
					<h4>SALINITY OUTPUT</h4>
					<SalinityInput value={salinityValue}
						onSalinityChange={salinity => onSalinityChange(salinity)}
					/>
				</div>
			</div>
		);
	}
}

SettingsEddiForm.propTypes = {
	onSalinityChange : PropTypes.func.isRequired,
	onStartChange : PropTypes.func.isRequired,
	onEndChange : PropTypes.func.isRequired,
	salinityValue : PropTypes.number,
	startValue : PropTypes.shape({
		hour : PropTypes.number,
		minute : PropTypes.number
	}), 
	endValue : PropTypes.shape({
		hour : PropTypes.number,
		minute : PropTypes.number
	})
};

SettingsEddiForm.defaultProps = {
	startValue : {
		hour : 9,
		minute : 0
	},
	endValue : {
		hour : 5,
		minute : 0
	},
	salinityValue : salinityOptions.default
};

export default SettingsEddiForm;