'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../../actions/menu';
import { selectEddiById } from '../../actions/eddis';

import { QUERY } from '../../constants';

import { mapDateToReadings } from '../../data';

import DashboardMenu from '../../components/DashboardMenu';
import DashboardSalinity from '../../components/DashboardSalinity';
import DashboardFlow from '../../components/DashboardFlow';

import style from './Dashboard.less';

function mapStateToProps(state){
	return {
		eddi : state.eddis.selected,
	};
}

function mapDispatchToProps(dispatch){
	return {
		updateMenuName:	(name) => dispatch(menuNameChange(name)),
		selectEddiById: (eddi) => dispatch(selectEddiById(eddi)),
	};
}

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			readings : [],
			current : {}
		};
	}

	componentWillMount(){
		const { updateMenuName, eddi={} } = this.props;
		if( eddi.id ) {
			updateMenuName(eddi.settings.name);
			if(eddi.readings){
				//format the readings into an array for data handling
				const readings = mapDateToReadings(eddi.readings),
					current = readings[readings.length - 1];
				console.log('these are the readings', readings, current);
				this.setState({ readings, current });
			}
		}
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={}, location } = this.props,
			{ eddi } = newProps;

		if( eddi.id !== oldEddi.id ) {
			updateMenuName(eddi.settings.name);
			if(eddi.readings){
				//format the readings into an array for data handling
				const readings = mapDateToReadings(eddi.readings),
					current = readings[readings.length - 1];

				this.setState({ readings, current });
			}
		}
	}

	_renderSalinity(current, direction){
		const { eddi={} } = this.props,
			threshold = eddi.settings.salinity;

		return (
			<DashboardSalinity key={direction} 
				threshold={threshold}
				current={current}
				direction={direction}
			/>
		);
	}

	_renderFlow(rate){
		return (
			<DashboardFlow rate={rate}/>
		);
	}

	_renderViewBasedQuery(view){
		const { eddi={} } = this.props,
			{ current } = this.state;
		//defaults to salinity out
		if(eddi.settings){
			switch(view){
			case QUERY.SALINITY_IN:
				return this._renderSalinity(current.ppmIn, 'input');
				break;
			case QUERY.FLOW:
				return this._renderFlow(current.qOut);
				break;
			default:
				return this._renderSalinity(current.ppmOut, 'output');
			}
		}
		return null;
	}

	render(){
		const { eddi={}, location={} } = this.props,
			{ id } = eddi,
			{ view } = location.query;

		let DashboardElement = this._renderViewBasedQuery(view);
		return (
			<div id="dashboard" className="page">
				<DashboardMenu id={id} 
					view={view}
				/>
				{ DashboardElement }
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
