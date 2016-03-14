'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS, QUERY } from '../constants';


class DashboardMenu extends Component {
	render(){
		const { id } = this.props;
		console.log('this is the id', id);
 		return (
			<div className='dashboard-menu'>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_IN }} }>
					<div>in</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_OUT }} }>
					<div>out</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.FLOW }} }>
					<div>flow</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.POWER }} }>
					<div>power</div>
				</Link>
			</div>
		);
	}
}

DashboardMenu.propTypes = {
	id : PropTypes.string
};


export default DashboardMenu;
