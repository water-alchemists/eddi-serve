'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { PATHS } from '../constants';

import style from '../less/Menu.less';



function mapStateToProps(state){
	return {
		menu : state.menu,
		eddis: state.eddis.list
	};
}


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
		if( this.props.eddis ){
		  	menuOptions = [
				<Link to={PATHS.LIST}>Home</Link>,
				<Link to={PATHS.DASHBOARD}>Dashboard</Link>,
				<Link to={PATHS.REPORT}>Report</Link>,
				<Link to={PATHS.SETTINGS}>Settings</Link>,
				<Link to={PATHS.TROUBLESHOOT}>Troubleshoot</Link>,
		  	];
		} else {
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
				<h1>{ this.props.menu.name }</h1>
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

export default connect(
	mapStateToProps,
	null
)(Menu);
