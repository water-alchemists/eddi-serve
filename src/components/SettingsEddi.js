'use strict';
import React, { Component } from 'react';
import classNames from 'classnames';

import SettingsEddiHeader from './SettingsEddiHeader';
import SettingsEddiVersion from './SettingsEddiVersion';
import SettingsEddiForm from './SettingsEddiForm';

const {
	PropTypes
} = React;

class SettingsEddi extends Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen : true
		};
	}

	toggleShow(){
		const { isOpen } = this.state;
		this.setState({ isOpen : !isOpen });
	}

	render(){
		const { isOpen } = this.state,
			{ eddi, onSalinityChange, onEndChange, onStartChange } = this.props,
			{ version={}, settings={} } = eddi,
			{ name, timing={}, salinity } = settings,
			bodyClass= classNames(['settings-container', { hide : !isOpen }]),
			footerClass=classNames(['arrow-container', { hide : !isOpen }]);

		return (
			<div className='settings-eddi'>
				<SettingsEddiHeader 
					name={settings.name}
					onClick={() => this.toggleShow()}
					isOpen={isOpen}
				/>
				<div className={bodyClass}>
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
				<div className={footerClass}>
					<div className='sprite arrow up faded' onClick={() => this.toggleShow()}></div>
				</div>
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
