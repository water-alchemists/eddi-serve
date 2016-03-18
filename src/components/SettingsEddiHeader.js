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
			<div className='header' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('http://www.inuvikgreenhouse.com/web_images/greenhouse01lg.jpg')"}}>
				<h3>{formattedName}</h3>
			</div>
		);
	}
}

SettingsEddiHeader.propTypes = {
	name : PropTypes.string.isRequired
};

export default SettingsEddiHeader;