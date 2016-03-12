'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class SettingsEddiHeader extends Component {
	render(){
		const { name } = this.props,
			formattedName = name.toUppercase();
		return (
			<div>
				<p>{formattedName}</p>
			</div>
		);
	}
}

SettingsEddiHeader.propTypes = {
	name : PropTypes.string
};

export default SettingsEddiHeader;