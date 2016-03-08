'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../constants';

const { 
	PropTypes
} = React;

class Menu extends Component {
	logoutHandler(){
		const { logout } = this.props;
		if(logout instanceof Function) logout();
	}

	render(){
		console.dir(this.props);
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
				{' '}
				<span onClick={() => this.logoutHandler()}>Logout</span>
			</header>
		);
	}
}

Menu.propTypes = {
	isOpen : PropTypes.bool.isRequired,
	logout : PropTypes.func.isRequired
};

export default Menu;