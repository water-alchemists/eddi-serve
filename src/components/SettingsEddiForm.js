'use strict';
import React, { Component, PropTypes } from 'react';

class SettingsEddiForm extends Component {
	render(){
		return (
			<div>

			</div>
		);
	}
}

SettingsEddiForm.propTypes = {
	onSalinityChange : PropTypes.func.isRequired,
	onStartChange : PropTypes.func.isRequired,
	onEndChange : PropTypes.func.isRequired
};

export default SettingsEddiForm;