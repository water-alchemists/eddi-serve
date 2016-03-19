'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class SettingsEddiHeader extends Component {
	clickHandler(event){
		event.preventDefault();
		const { onClick } = this.props;
		console.log('click');
		if(onClick instanceof Function) onClick();
	}
	render(){
		const { name } = this.props,
			formattedName = name.toUpperCase();
		return (
			<div className='header' 
				style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('http://www.inuvikgreenhouse.com/web_images/greenhouse01lg.jpg')"}}
				onClick={event => this.clickHandler(event)}
			>
				<h3>{formattedName}</h3>
			</div>
		);
	}
}

SettingsEddiHeader.propTypes = {
	name : PropTypes.string.isRequired,
	onClick: PropTypes.func
};

export default SettingsEddiHeader;