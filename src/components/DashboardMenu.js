'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS, QUERY } from '../constants';


class DashboardMenu extends Component {
	render(){
		const { id, view } = this.props;

		//handles appearance of default tab
		let classString = '';
		if(!view) classString = 'active';

 		return (
			<div className='dashboard-menu'>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_IN }} }
					activeClassName='active'
				>
					<div>in</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_OUT }} }
					activeClassName='active'
					className={classString}
				>
					<div>out</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.FLOW }} }
					activeClassName='active'
				>
					<div>flow</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.POWER }} }
					activeClassName='active'
				>
					<div>power</div>
				</Link>
			</div>
		);
	}
}

DashboardMenu.propTypes = {
	id : PropTypes.string,
	view : PropTypes.string
};


export default DashboardMenu;
