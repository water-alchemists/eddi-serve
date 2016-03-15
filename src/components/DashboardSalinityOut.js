'use strict';
import React, { Component, PropTypes } from 'react';
import SalinityGraph from './graphs/SalinityGraph';

function generateBadText(){
	return 'which is not well. Please check your settings for your eddi.';
}

function generateGoodText(){
	return 'so everything is doing well.';
}

class DashboardSalinityOut extends Component {
	render(){
		const { threshold, current } = this.props,
			status = current > threshold ? generateBadText() : generateGoodText();
		return (
			<div className='dashboard-view salinity'>
				<div className='dashboard-current'>
					<div className='dashboard-current-numbers'>
						<h1>Salinity Output</h1>
						<h3>{`${current}`}</h3>
						<p>parts per million</p>
					</div>
					<SalinityGraph salinity={current}/>
					<p className='dashboard-note'>
						Your current level of salinity for the water your EDDI
						is pushing out is
						<span>{` ${current} ppm. `}</span>
						Your current threshold is set at
						<span>{` ${threshold} ppm, `}</span>
						{`${status}`}
					</p>
				</div>

			</div>
		);
	}
}

DashboardSalinityOut.propTypes = {
	threshold : PropTypes.number.isRequired,
	current : PropTypes.number.isRequired,
};


export default DashboardSalinityOut;
