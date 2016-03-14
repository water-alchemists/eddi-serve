'use strict';
import React, { Component, PropTypes } from 'react';

class DashboardMenu extends Component { 
	render(){
		return (
			<div>
			</div>
		);
	}
}

DashboardMenu.propTypes = {
	eddi : PropTypes.shape({
		id : PropTypes.string.isRequired
	}).isRequired
}