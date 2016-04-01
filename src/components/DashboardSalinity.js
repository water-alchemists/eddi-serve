'use strict';
import React, { Component, PropTypes } from 'react';

import { SALINITY_THRESHOLD, HISTORICAL } from '../constants';

import SalinityGraph from './graphs/SalinityGraph';
import HistoricalGraph from './graphs/HistoricalGraph';

import { formatToTodayHistory, 
	formatToWeekHistory, 
	formatToMonthHistory,
	commaSeparateNumber
} from '../data';

const FORMATTERS = {
	[HISTORICAL.TODAY] : formatToTodayHistory,
	[HISTORICAL.WEEK] : formatToWeekHistory,
	[HISTORICAL.MONTH] : formatToMonthHistory
};

function generateBadText(isIn){
	const checkEddiText = 'Please check the settings for your eddi.';
	return `so this is not good. ${isIn ? '' : checkEddiText }`;
}

function generateGoodText(){
	return 'so everything is working correctly.';
}

function generateInput(){
	return 'The current level of salinity of the water entering your EDDI is';
}

function generateOutput(){
	return 'The current level of salinity of the water your EDDI is pushing out is';

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
			isIn = direction === 'input',
			status = current > threshold ? generateBadText(isIn) : generateGoodText(),
			currentString = commaSeparateNumber(current),
			thresholdString = commaSeparateNumber(threshold);

		return (
			<div className='dashboard-view salinity'>
				<div className='dashboard-current'>
					<div className='dashboard-current-numbers'>
						<h1>Salinity {direction.toUpperCase()}</h1>
						<h3>{`${currentString}`}</h3>
						<p>parts per million</p>
					</div>
					<SalinityGraph salinity={current}/>
					<p className='dashboard-note'>
						{ direction === 'input' ? generateInput() : generateOutput() }
						<span>{` ${currentString} ppm. `}</span>
						Your current threshold is set at
						<span>{` ${thresholdString} ppm, `}</span>
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
