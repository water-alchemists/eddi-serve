'use strict';
import React, { Component, PropTypes } from 'react';

import FlowGraph from './graphs/FlowGraph';

function generateStatusText(rate){
	if(rate <= 0.3) return 'slow';
	else if(rate <= 3) return 'medium';
	else return 'fast';
}

class DashboardFlow extends Component {
	render(){
		const { rate } = this.props;

		return (
			<div >
				<div>
					<div >
						<h1>WATER FLOW</h1>
						<h3>{`${rate}`}</h3>
						<p>liters per minute</p>
					</div>
					<FlowGraph rate={rate} />
				</div>
				<p>
					Your current level of water flow is 
					<span>{` ${rate} lpm, `}</span>
					which is a
					<span>{` ${generateStatusText(rate)} `}</span>
					flow.
				</p>
			</div>
		);
	}
}

DashboardFlow.propTypes = {
	rate : PropTypes.number.isRequired
};

export default DashboardFlow;