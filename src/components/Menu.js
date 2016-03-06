'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../constants';

class Menu extends Component {
	render(){
		return(
			<header>
				Links:
				{' '}
				<Link to={PATHS.HOME}>Home</Link>
				{' '}
				<Link to={PATHS.LOGIN}>Login</Link>
				{' '}
				<Link to={PATHS.SIGNUP}>Signup</Link>
				{' '}
				<Link to={PATHS.DASHBOARD}>Dashboard</Link>
				{' '}
				<Link to={PATHS.REPORT}>Report</Link>
				{' '}
				<Link to={PATHS.SETTINGS}>Settings</Link>
				{' '}
				<Link to={PATHS.TROUBLESHOOT}>Troubleshoot</Link>
			</header>
		);
	}
}

export default Menu;