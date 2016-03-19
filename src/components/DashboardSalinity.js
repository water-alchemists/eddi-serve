'use strict';
import React, { Component, PropTypes } from 'react';
import SalinityGraph from './graphs/SalinityGraph';
import HistoricalGraph from './graphs/HistoricalGraph';


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
			<div className='dashboard-view salinity'>
				<div className='dashboard-current'>
					<div className='dashboard-current-numbers'>
						<h1>Salinity {direction.toUpperCase()}</h1>
						<h3>{`${current.toLocaleString()}`}</h3>
						<p>parts per million</p>
					</div>
					<SalinityGraph salinity={current}/>
					<p className='dashboard-note'>
						Your current level of salinity for the water your EDDI
						is pushing out is
						<span>{` ${current.toLocaleString()} ppm. `}</span>
						Your current threshold is set at
						<span>{` ${threshold.toLocaleString()} ppm, `}</span>
						{`${status}`}
					</p>
				</div>
				<HistoricalGraph />
			</div>
		);
	}
}

DashboardSalinity.propTypes = {
	threshold : PropTypes.number.isRequired,
	current : PropTypes.number.isRequired,
	direction : PropTypes.string.isRequired
};

DashboardSalinity.defaultProps = {
	threshold : 1000
};

export default DashboardSalinity;
