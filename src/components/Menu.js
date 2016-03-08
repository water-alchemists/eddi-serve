'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../constants';

const { 
	PropTypes
} = React;

class Menu extends Component {
	_renderLoggedIn(){
		return (
			<header>
				Links:
				{' '}
				<Link to={PATHS.HOME}>Home</Link>
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

	_renderLoggedOut(){
		return (
			<header>
				Links:
				{' '}
				<Link to={PATHS.HOME}>Home</Link>
				{' '}
				<Link to={PATHS.LOGIN}>Login</Link>
				{' '}
				<Link to={PATHS.SIGNUP}>Signup</Link>
			</header>
		);
	}

	logoutHandler(){
		const { logout } = this.props;
		if(logout instanceof Function) logout();
	}

	render(){
		const { user } = this.props,
			isLoggedIn = !!user.email;

		if(isLoggedIn) return this._renderLoggedIn();
		else return this._renderLoggedOut();
	}
}

Menu.propTypes = {
	isOpen : PropTypes.bool.isRequired,
	logout : PropTypes.func.isRequired,
	user : PropTypes.shape({
		email : PropTypes.string
	})
};

export default Menu;