'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import { PATHS, QUERY } from '../constants';

const ACTIVE_CLASS = 'active';

const ROUTES = {
	SALINITY_OUT: function(id){
		return { 
			pathname : PATHS.DASHBOARD, 
			query : { 
				view : QUERY.SALINITY_OUT,
				id
			}
		};
	},
	SALINITY_IN : function(id){ 
		return {
			pathname : PATHS.DASHBOARD, 
			query : { 
				view : QUERY.SALINITY_IN,
				id
			}
		};
	},
	SALINITY_REC : function(id){ 
		return {
			pathname : PATHS.DASHBOARD, 
			query : { 
				view : QUERY.SALINITY_REC,
				id
			}
		};
	},
	FLOW : function(id){ 
		return {
			pathname : PATHS.DASHBOARD, 
			query : { 
				view : QUERY.FLOW,
				id
			}
		};
	},
	// POWER : function(id){ 
	// 	return {
	// 		pathname : PATHS.DASHBOARD, 
	// 		query : {
	// 			view : QUERY.POWER,
	// 			id
	// 		}
	// 	};
	// }
}

class DashboardMenu extends Component {
	render(){
		const { router } = this.context,
			{ id, view, salinityIn, salinityOut, flow, salinityRec } = this.props,
			defaultViewClass = classNames({ [ACTIVE_CLASS] : !view }), //handles appearance of default tab
			salinityInClass = classNames([
				'sprite', 
				'salinityIn', 
				{ faded : !router.isActive(ROUTES.SALINITY_IN) },
				{ bad : salinityIn === false },
				{ none : salinityIn === undefined }
			]),
			salinityInFont = classNames({ 
				'red-font' : salinityIn === false,
				'gray-font' : salinityIn === undefined
			}),
			salinityOutClass = classNames([
				'sprite', 
				'salinityOut', 
				{ faded : view && !router.isActive(ROUTES.SALINITY_OUT) },
				{ bad : salinityOut === false },
				{ none : salinityOut === undefined }
			]),
			salinityOutFont = classNames({ 
				'red-font' : salinityOut === false,
				'gray-font' : salinityOut === undefined
			}),
			flowClass = classNames([
				'sprite', 
				'flow', 
				{ faded : !router.isActive(ROUTES.FLOW) },
				{ bad : flow === false },
				{ none : flow === undefined }
			]),
			flowFont = classNames({ 
				'red-font' : flow === false,
				'gray-font' : flow === undefined 
			}),
			salinityRecClass = classNames([
				'sprite', 
				'salinityRec', 
				{ faded : view && !router.isActive(ROUTES.SALINITY_REC) },
				{ bad : salinityRec === false },
				{ none : salinityRec === undefined }
			]),
			salinityRecFont = classNames({ 
				'red-font' : salinityRec === false,
				'gray-font' : salinityRec === undefined
			});
			// powerClass = classNames([
			// 	'sprite', 
			// 	'power', 
			// 	{ faded : !router.isActive(ROUTES.POWER) },
			// 	{ bad : !power }
			// ]),
			// powerFont = classNames({ 'red-font' : !power });	
			
			// Currently no power as part of the dashboard
			// <Link to={ ROUTES.POWER(id) }
			// 		activeClassName={ACTIVE_CLASS}
			// 	>
			// 		<div className={powerClass} />							
			// 		<p className={powerFont}>power</p>
			// 	</Link>	

 		return (
			<div className='dashboard-menu'>
				<Link to={ ROUTES.SALINITY_IN(id) }
					activeClassName={ACTIVE_CLASS}
				>
					<div className={salinityInClass} />
					<p className={salinityInFont}>in</p>
				</Link>
				<Link to={ ROUTES.SALINITY_OUT(id) }
					activeClassName={ACTIVE_CLASS}
					className={defaultViewClass}
				>
					<div className={salinityOutClass} />
					<p className={salinityOutFont}>out</p>
				</Link>
				<Link to={ ROUTES.SALINITY_REC(id) }
					activeClassName={ACTIVE_CLASS}
				>
					<div className={salinityRecClass} />
					<p className={salinityRecFont}>rec</p>
				</Link>
				<Link to={ ROUTES.FLOW(id) }
					activeClassName={ACTIVE_CLASS}
				>
					<div className={flowClass} />
					<p className={flowFont}>flow</p>
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
