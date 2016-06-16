'use strict';
import React, { Component } from 'react';
import classNames from 'classnames';

const { 
	PropTypes
} = React;

class SettingsEddiHeader extends Component {
	clickHandler(event){
		event.preventDefault();
		const { onClick } = this.props;
		if(onClick instanceof Function) onClick();
	}
	render(){
		const { name, isOpen } = this.props,
			containerClass = classNames(['arrow-container', { hide : isOpen}]),
			formattedName = name.toUpperCase();
		return (
			<div className='header' 
				style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/greenhouse.jpg')"}}
				onClick={event => this.clickHandler(event)}
			>
				<h3>{formattedName}</h3>
				<div className={containerClass}>
					<div className='sprite arrow down'></div>
				</div>
			</div>
		);
	}
}

SettingsEddiHeader.propTypes = {
	name : PropTypes.string.isRequired,
	onClick: PropTypes.func,
	isOpen : PropTypes.bool
};

export default SettingsEddiHeader;