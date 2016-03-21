'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import { PATHS, QUERY } from '../constants';

const ACTIVE_CLASS = 'active';

const ROUTES = {
	SALINITY_OUT: { 
		pathname : PATHS.DASHBOARD, 
		query : { 
			view : QUERY.SALINITY_OUT 
		} 
	},
	SALINITY_IN : { 
		pathname : PATHS.DASHBOARD, 
		query : { 
			view : QUERY.SALINITY_IN 
		} 
	},
	FLOW : { 
		pathname : PATHS.DASHBOARD, 
		query : { 
			view : QUERY.FLOW 
		} 
	},
	POWER : { 
		pathname : PATHS.DASHBOARD, 
		query : { 
			view : QUERY.POWER
		}
	}
}

class DashboardMenu extends Component {
	render(){
		console.log('this context', this.context);
		const { router } = this.context,
			{ id, view, salinityIn, salinityOut, flow, power } = this.props,
			defaultViewClass = classNames({ [ACTIVE_CLASS] : !view }), //handles appearance of default tab
			salinityInClass = classNames([
				'sprite', 
				'salinityIn', 
				{ faded : !router.isActive(ROUTES.SALINITY_IN) },
				{ bad : !salinityIn }
			]),
			salinityInFont = classNames({ 'red-font' : !salinityIn }),
			salinityOutClass = classNames([
				'sprite', 
				'salinityOut', 
				{ faded : view && !router.isActive(ROUTES.SALINITY_OUT) },
				{ bad : !salinityOut }
			]),
			salinityOutFont = classNames({ 'red-font' : !salinityOut }),
			flowClass = classNames([
				'sprite', 
				'flow', 
				{ faded : !router.isActive(ROUTES.FLOW) },
				{ bad : !flow }
			]),
			flowFont = classNames({ 'red-font' : !flow }),
			powerClass = classNames([
				'sprite', 
				'power', 
				{ faded : !router.isActive(ROUTES.POWER) },
				{ bad : !power }
			]),
			powerFont = classNames({ 'red-font' : !power });		

 		return (
			<div className='dashboard-menu'>
				<Link to={ ROUTES.SALINITY_IN }
							activeClassName={ACTIVE_CLASS}>
					<div className={salinityInClass} />
					<p className={salinityInFont}>in</p>
				</Link>
				<Link to={ ROUTES.SALINITY_OUT }
							activeClassName={ACTIVE_CLASS}
					className={defaultViewClass}>
					<div className={salinityOutClass} />
					<p className={salinityOutFont}>out</p>
				</Link>
				<Link to={ ROUTES.FLOW }
							activeClassName={ACTIVE_CLASS}>
					<div className={flowClass} />
					<p className={flowFont}>flow</p>
				</Link>
				<Link to={ ROUTES.POWER }
							activeClassName={ACTIVE_CLASS}>
					<div className={powerClass} />							
					<p className={powerFont}>power</p>
				</Link>
			</div>
		);
	}
}

DashboardMenu.propTypes = {
	id : PropTypes.string,
	view : PropTypes.string,
	current : PropTypes.string,
	salinityIn : PropTypes.bool,
	salinityOut : PropTypes.bool,
	flow : PropTypes.bool,
	power : PropTypes.bool
};

DashboardMenu.contextTypes = {
	router : PropTypes.object.isRequired,
};


export default DashboardMenu;
