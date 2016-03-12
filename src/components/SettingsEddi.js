'use strict';
import React, { Component } from 'react';
import SettingsEddiHeader from './SettingsEddiHeader';
import SettingsEddiVersion from './SettingsEddiVersion';

const {
	PropTypes
} = React;

class SettingsEddi extends Component {

	render(){
		return (
			<div>
				<SettingsEddiHeader />
				<SettingEddiVersion />
				<div></div>
			</div>
		);
	}
}

SettingsEddi.propTypes = {
	onSalinityChange : PropTypes.func,
	onStartChange : PropTypes.func,
	onEndChange : PropTypes.func,
	eddi : PropTypes.shape({
		version : PropTypes.shape({
			eddi : PropTypes.shape({
				number : PropTypes.string,
				updated : PropTypes.string
			}),
			artik : PropTypes.shape({
				number : PropTypes.string,
				updated : PropTypes.string
			})
		}),
		settings : PropTypes.shape({
			name : PropTypes.string,
			timing : PropTypes.shape({
				start : PropTypes.number,
				end : PropTypes.number
			}),
			salinity : PropTypes.number
		}),
	}).isRequired
}

export default SettingsEddi;
