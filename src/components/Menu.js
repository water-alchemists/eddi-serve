'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../constants';




class Menu extends Component {

	constructor(props){
		super(props);
		this.state = {
			optionsOpen: false
		};
	}

	toggleMenu(){
		this.setState({
			optionsOpen: !this.state.optionsOpen
		});
	}

	_renderLoggedIn(){
		return (
			<header id="navbar">
				<div 	className={"burger-menu" + (this.state.optionsOpen ? ' open' : '') }
							onClick={ () => this.toggleMenu() } >
					<div className="icon">☰</div>
					<div className='menu-options'>
						<Link to={PATHS.LIST}>Home</Link>
						<Link to={PATHS.DASHBOARD}>Dashboard</Link>
						<Link to={PATHS.REPORT}>Report</Link>
						<Link to={PATHS.SETTINGS}>Settings</Link>
						<Link to={PATHS.TROUBLESHOOT}>Troubleshoot</Link>
						<a onClick={() => this.logoutHandler()}>Logout</a>
					</div>
				</div>
			</header>
		);
	}

	_renderLoggedOut(){
		return (
			<header className={'navbar'}>
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

		if(isLoggedIn){
			return this._renderLoggedIn();
		} else {
			return null;
		}
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
