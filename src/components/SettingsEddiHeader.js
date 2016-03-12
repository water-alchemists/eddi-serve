'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class SettingsEddiHeader extends Component {
	render(){
		const { name } = this.props,
			formattedName = name.toUpperCase();
		return (
			<div>
				<p>{formattedName}</p>
			</div>
		);
	}
}

SettingsEddiHeader.propTypes = {
	name : PropTypes.string.isRequired
};

export default SettingsEddiHeader;