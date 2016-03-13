'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../constants';

import style from '../less/Menu.less';

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
		var menuOptions;
		const { menu, eddis } = this.props;

		if( eddis instanceof Array && eddis.length ){
		  	menuOptions = [
				<Link to={PATHS.LIST}>Home</Link>,
				<Link to={PATHS.DASHBOARD}>Dashboard</Link>,
				<Link to={PATHS.REPORT}>Report</Link>,
				<Link to={PATHS.SETTINGS}>Settings</Link>,
				<Link to={PATHS.TROUBLESHOOT}>Troubleshoot</Link>,
		  	];
		}

		return (
			<header id="menu">
				<div className={"burger-menu" + (this.state.optionsOpen ? ' open' : '') }
							onClick={ () => this.toggleMenu() } >
					<div className="icon">☰</div>
					<div className='menu-options'>
						{ menuOptions }
						<a onClick={() => this.logoutHandler()}>Logout</a>
					</div>
				</div>
				<h1>{ menu.name }</h1>
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
	}),
	eddis : PropTypes.arrayOf(
		PropTypes.shape({
			id : PropTypes.string
		})
	),
	menu : PropTypes.shape({
		name : PropTypes.string
	})
};

export default Menu;
