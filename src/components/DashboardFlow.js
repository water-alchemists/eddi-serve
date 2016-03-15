'use strict';
import React, { Component } from 'react';

import FlowGraph from './graphs/FlowGraph';

class DashboardFlow extends Component {
	render(){
		return (
			<div>
				<FlowGraph rate={3} />
			</div>
		);
	}
}

DashboardFlow.propTypes = {

};

export default DashboardFlow;