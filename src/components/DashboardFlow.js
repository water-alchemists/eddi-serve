'use strict';
import React, { Component, PropTypes } from 'react';

import FlowGraph from './graphs/FlowGraph';
import HistoricalGraph from './graphs/HistoricalGraph';

import { HISTORICAL } from '../constants';

import { formatToTodayHistory, 
	formatToWeekHistory, 
	formatToMonthHistory } from '../data';

const FORMATTERS = {
	[HISTORICAL.TODAY] : formatToTodayHistory,
	[HISTORICAL.WEEK] : formatToWeekHistory,
	[HISTORICAL.MONTH] : formatToMonthHistory
};

function generateStatusText(rate){
	if(rate <= 0.3) return 'slow';
	else if(rate <= 3) return 'medium';
	else return 'fast';
}

class DashboardFlow extends Component {
	constructor(props){
		super(props);
		this.state = {
			type : HISTORICAL.TODAY,
			graphData : []
		};
	}
	graphClick(type){
		this.setState({ type });
	}
	render(){
		const { type } = this.state,
			{ rate, readings } = this.props;

		return (
			<div className='dashboard-view flow'>
				<div className='dashboard-current'>
					<div className='dashboard-current-numbers'>
						<h1>WATER FLOW</h1>
						<h3>{`${rate}`}</h3>
						<p>liters per minute</p>
					</div>
					<FlowGraph rate={rate} />
					<p className='dashboard-note'>
						Your current level of water flow is
						<span>{` ${rate} lpm, `}</span>
						which is a
						<span>{` ${generateStatusText(rate)} `}</span>
						flow.
					</p>
				</div>
				<HistoricalGraph data={readings}
					onClick={type => this.graphClick(type)}
					type={type}
				/>
			</div>
		);
	}
}

DashboardFlow.propTypes = {
	rate : PropTypes.number.isRequired,
	readings : PropTypes.arrayOf(
		PropTypes.shape({
			date : PropTypes.instanceOf(Date).isRequired,
			qOut : PropTypes.number.isRequired
		})
	).isRequired
};

export default DashboardFlow;
