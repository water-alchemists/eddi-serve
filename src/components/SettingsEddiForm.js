'use strict';
import React, { Component, PropTypes } from 'react';

import { salinityOptions } from '../data';

import SalinityInput from './SalinityInput';
import TimeSelect from './TimeSelect';
import CropInput from './CropInput';
import ZipInput from './ZipInput';

class SettingsEddiForm extends Component {
	render(){
		const { 
			salinityValue, 
			startValue, 
			endValue, 
			zipValue,
			onSalinityChange, 
			onStartChange, 
			onEndChange,
			onZipChange 
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
					<div className='select-container'>
						<CropInput value={salinityValue}
							onChange={ salinity => onSalinityChange(salinity) } 
						/>
						<p>OR</p>
						<SalinityInput value={salinityValue}
							onSalinityChange={salinity => onSalinityChange(salinity)}
						/>
					</div>
				</div>
				<div className='zip-row'>
					<h4>LOCATION - ZIP CODE</h4>
					<div className='select-container'>
						<ZipInput value={zipValue}
							onChange={ zip => onZipChange(zip)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

SettingsEddiForm.propTypes = {
	onSalinityChange : PropTypes.func.isRequired,
	onStartChange : PropTypes.func.isRequired,
	onEndChange : PropTypes.func.isRequired,
	onZipChange : PropTypes.func.isRequired,
	salinityValue : PropTypes.number,
	startValue : PropTypes.shape({
		hour : PropTypes.number,
		minute : PropTypes.number
	}), 
	endValue : PropTypes.shape({
		hour : PropTypes.number,
		minute : PropTypes.number
	}),
	zipValue : PropTypes.number
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