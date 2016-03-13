'use strict';
import React, { Component } from 'react';
import SettingsEddiHeader from './SettingsEddiHeader';
import SettingsEddiVersion from './SettingsEddiVersion';
import SettingsEddiForm from './SettingsEddiForm';

const {
	PropTypes
} = React;

class SettingsEddi extends Component {

	render(){
		const { eddi, onSalinityChange, onEndChange, onStartChange } = this.props,
			{ version={}, settings={} } = eddi,
			{ name, timing={}, salinity } = settings;
		console.log('settings eddi', eddi, version, settings);
		return (
			<div>
				<SettingsEddiHeader 
					name={settings.name}
				/>
				<SettingsEddiVersion 
					artikNumber={version.artik.number}
					artikDate={new Date(version.artik.updated)}
					eddiNumber={version.eddi.number}
					eddiDate={new Date(version.eddi.updated)}
				/>
				<SettingsEddiForm onSalinityChange={salinity => onSalinityChange(salinity)}
					onEndChange={(hour, minutes) => onEndChange(hour, minutes)}
					onStartChange={(hour, minutes) => onStartChange(hour, minutes)}
					salinityValue={salinity}
					startValue={timing.start}
					endValue={timing.end}
				/>
			</div>
		);
	}
}

SettingsEddi.propTypes = {
	onSalinityChange : PropTypes.func.isRequired,
	onStartChange : PropTypes.func.isRequired,
	onEndChange : PropTypes.func.isRequired,
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
				start : PropTypes.shape({
					hour : PropTypes.number,
					minute : PropTypes.number
				}),
				end : PropTypes.shape({
					hour : PropTypes.number,
					minute : PropTypes.number
				})
			}),
			salinity : PropTypes.number
		}),
	}).isRequired
}

export default SettingsEddi;
