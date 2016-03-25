'use strict';
import React, { Component, PropTypes } from 'react';

import { SALINITY_THRESHOLD, HISTORICAL } from '../constants';

import SalinityGraph from './graphs/SalinityGraph';
import HistoricalGraph from './graphs/HistoricalGraph';

import { formatToTodayHistory, 
	formatToWeekHistory, 
	formatToMonthHistory } from '../data';

const FORMATTERS = {
	[HISTORICAL.TODAY] : formatToTodayHistory,
	[HISTORICAL.WEEK] : formatToWeekHistory,
	[HISTORICAL.MONTH] : formatToMonthHistory
};

function generateBadText(){
	return 'which is not well. Please check your settings for your eddi.';
}

function generateGoodText(){
	return 'so everything is doing well.';
}

class DashboardSalinity extends Component {
	constructor(props){
		super(props);
		const type = HISTORICAL.TODAY,
			{ readings, direction } = this.props,
			prop = direction === 'input' ? 'ppmIn' : 'ppmOut',
			formatter = FORMATTERS[type];
		let graphData = [];
		if(formatter instanceof Function) graphData = formatter(readings, prop);

		this.state = {
			type,
			graphData
		};
	}

	componentWillReceiveProps(nextProps){
		const { type } = this.state,
			{ readings, direction } = nextProps,
			prop = direction === 'input' ? 'ppmIn' : 'ppmOut',
			formatter = FORMATTERS[type];
		let graphData = [];
		if(formatter instanceof Function) graphData = formatter(readings, prop);
		this.setState({ graphData });
	}

	graphClick(type){
		const { readings, direction } = this.props,
			prop = direction === 'input' ? 'ppmIn' : 'ppmOut',
			formatter = FORMATTERS[type];
		let graphData = [];
		if(formatter instanceof Function) graphData = formatter(readings, prop);
		this.setState({ type, graphData });
	}
	render(){
		const { type, graphData } = this.state,
			{ threshold, current, direction, readings } = this.props,
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
				<HistoricalGraph data={graphData}
					onClick={type => this.graphClick(type)}
					type={type}
					threshold={threshold}
				/>
			</div>
		);
	}
}

DashboardSalinity.propTypes = {
	threshold : PropTypes.number.isRequired,
	current : PropTypes.number.isRequired,
	direction : PropTypes.string.isRequired,
	readings : PropTypes.arrayOf(
		PropTypes.shape({
			date : PropTypes.instanceOf(Date),
			ppmIn : PropTypes.number,
			ppmOut : PropTypes.number
		})
	).isRequired
};

DashboardSalinity.defaultProps = {
	threshold : SALINITY_THRESHOLD
};

export default DashboardSalinity;
