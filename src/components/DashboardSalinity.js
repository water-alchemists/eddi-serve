'use strict';
import React, { Component, PropTypes } from 'react';
import SalinityGraph from './graphs/SalinityGraph';

function generateBadText(){
	return 'which is not well. Please check your settings for your eddi.';
}

function generateGoodText(){
	return 'so everything is doing well.';
}

class DashboardSalinity extends Component {
	render(){
		const { threshold, current, direction } = this.props,
			status = current > threshold ? generateBadText() : generateGoodText();
		return (
			<div>
				<div style={styles.row}>
					<div>
						<h1>SALINITY</h1>
						<h1>{direction.toUpperCase()}</h1>
						<h3>{`${current}`}</h3>
						<p>parts per million</p>
					</div>
					<SalinityGraph salinity={current}/>
				</div>
				<p>
					Your current level of salinity for the water your EDDI
					is pushing out is 
					<span>{` ${current} ppm. `}</span>
					Your current threshold is set at
					<span>{` ${threshold} ppm, `}</span>
					{`${status}`}
				</p>
			</div>
		);
	}
}

DashboardSalinity.propTypes = {
	threshold : PropTypes.number.isRequired,
	current : PropTypes.number.isRequired,
	direction : PropTypes.string.isRequired
};

const styles = {
	row : {
		display : 'flex', 
		flexDirection : 'row',
		justifyContent : 'space-between',
		alignItems : 'flex-start'
	}
}

DashboardSalinity.defaultProps = {
	threshold : 1000
};

export default DashboardSalinity;