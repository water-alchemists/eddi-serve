'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { PATHS } from '../constants';

import style from '../less/Menu.less';

function isPath(path, compare){
	return compare.indexOf(path) > -1;
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
		const { menu, eddis, current } = this.props,
			{ name='' } = menu,
			{ list, selected={} }  = eddis,
			query = {
				id : selected.id
			},
			homeSpriteClass = classNames([
				'sprite', 
				'home', 
				{ green : current === PATHS.HOME || isPath(PATHS.LIST, current) }
			]),
			settingsSpriteClass = classNames([
				'sprite',
				'settings', 
				{ green : isPath(PATHS.SETTINGS, current) }
			]),
			reportSpriteClass = classNames([
				'sprite',
				'report',
				{ green : isPath(PATHS.REPORT, current) }
			]),
			troubleshootSpriteClass = classNames([
				'sprite',
				'troubleshoot',
				{ green : isPath(PATHS.TROUBLESHOOT, current) }
			]),
			dashboardSpriteClass = classNames([
				'sprite',
				'dashboard',
				{ green : isPath(PATHS.DASHBOARD, current) }
			]);

		let menuOptions;

		if( list instanceof Array && list.length ){
		  	menuOptions = [
				(<Link to={{ pathname : PATHS.DASHBOARD, query }}
					activeClassName='active'
					key={'dashboard'}
				>
					<div className={dashboardSpriteClass}></div>
					<p>Dashboard</p>
				</Link>),
				(<Link to={ PATHS.SETTINGS } 
					activeClassName='active'
					key={'settings'}
				>
					<div className={settingsSpriteClass}></div>
					<p>Settings</p>
				</Link>),
				(<Link to={{ pathname : PATHS.REPORT, query }}
					activeClassName='active'
					key={'report'}
				>
					<div className={reportSpriteClass}></div>
					<p>Report</p>
				</Link>),
				(<Link to={{ pathname : PATHS.TROUBLESHOOT, query }}
					activeClassName='active'
					key={'troubleshoot'}
				>
					<div className={troubleshootSpriteClass}></div>
					<p>Troubleshoot</p>
				</Link>),
		  	];
		}

		return (
			<header id="menu">
				<div className={"burger-menu" + (this.state.optionsOpen ? ' open' : '') }
					onClick={ () => this.toggleMenu() } >
					<div className="icon">☰</div>
					<div className='menu-options'>
						<Link to={PATHS.LIST}
							activeClassName='active'
						>
							<div className={homeSpriteClass}></div>
							<p>Home</p>
						</Link>
						{ menuOptions }
						<a onClick={() => this.logoutHandler()}>
							<div className='sprite empty'></div>
							<p>Logout</p>
						</a>
					</div>
				</div>
				<h1>{ name }</h1>
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
	eddis : PropTypes.shape({
		list : PropTypes.arrayOf(
			PropTypes.shape({
				id : PropTypes.string
			})
		),
		selected : PropTypes.shape({
			id : PropTypes.string
		})
	}), 
	menu : PropTypes.shape({
		name : PropTypes.string
	}),
	current : PropTypes.string
};

export default Menu;
