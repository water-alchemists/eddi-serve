'use strict';
import React, { Component, PropTypes } from 'react';
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
					<div style={styles.row}>
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

const styles = {
	row : {
		display : 'flex', 
		flexDirection : 'row', 
		justifyContent : 'space-between',
		alignItems : 'center'
	}
}

export default SettingsEddiForm;