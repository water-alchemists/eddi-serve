'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS, QUERY } from '../constants';


class DashboardMenu extends Component { 
	render(){
		const { id } = this.props;
 		return (
			<div style={styles.row}>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_IN }} }>
					<div>in</div>
				</Link>
				<Link to={ {pathname : PATHS.DASHBOARD, query : { id, view : QUERY.SALINITY_IN }} }>
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

const styles ={
	row : {
		display: 'flex', 
		flexDirection : 'row', 
		justifyContent : 'space-between',
		alignItems : 'center'
	}
}

export default DashboardMenu;