'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../../actions/menu';
import { selectEddiById } from '../../actions/eddis';

import { QUERY } from '../../constants';

import FlowGraph from '../../components/graphs/FlowGraph';
import DashboardMenu from '../../components/DashboardMenu';
import DashboardSalinityOut from '../../components/DashboardSalinityOut';

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

function mapDateToReadings(readings){
	return Object.keys(readings)
		.map(utc => {
			return {
				...readings[utc],
				date : new Date(utc * 1000)
			}
		})
		.sort((a,b) => a.date > b.date);
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
			console.log('i am here');
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
				console.log('these are the readings', readings, current);
				this.setState({ readings, current });
			}
		}
	}

	_renderSalinity(current){
		const { eddi={} } = this.props,
			threshold = eddi.settings.salinity;

		return (
			<DashboardSalinityOut threshold={threshold}
				current={current}
			/>
		);
	}

	_renderViewBasedQuery(view){
		const { eddi={} } = this.props,
			{ current } = this.state;
		if(eddi.settings){
			switch(view){
			case QUERY.SALINITY_OUT:
				return this._renderSalinity(current.ppmOut);
				break;
			case QUERY.SALINITY_IN:
				return this._renderSalinity(current.ppmIn)
			default:
				return null;
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
				<DashboardMenu id={id} />
				{ DashboardElement }
				<FlowGraph rate={3} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
