'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../../actions/menu';
import { selectEddiById, updateEddiSuccess, getEddiReadings } from '../../actions/eddis';

import { QUERY, FLOW_THRESHOLD, SALINITY_THRESHOLD } from '../../constants';

import { mapDateToReadings } from '../../data';

import DashboardMenu from '../../components/DashboardMenu';
import DashboardSalinity from '../../components/DashboardSalinity';
import DashboardFlow from '../../components/DashboardFlow';

import style from './Dashboard.less';

import EddiFireStarter from '../../modules/eddi-firebase';
const EddiFire = EddiFireStarter();

function getGoodBad(current, threshold){
	if(!threshold) threshold = SALINITY_THRESHOLD; //default threshold for salinity
	const { ppmIn, ppmOut, qOut } = current,
		flowGood = qOut > FLOW_THRESHOLD ? false : true,
		salinityInGood = ppmIn > threshold ? false : true,
		salinityOutGood = ppmOut > threshold ? false : true,
		powerGood = true;

	return {
		salinityIn : salinityInGood,
		salinityOut : salinityOutGood,
		power : powerGood,
		flow : flowGood
	};
}

function mapStateToProps(state){
	return {
		eddi : state.selected,
	};
}

function mapDispatchToProps(dispatch){
	return {
		updateMenuName:	(name) => dispatch(menuNameChange(name)),
		selectEddiById: (eddi) => dispatch(selectEddiById(eddi)),
		updateEddiSettings : (id, settings) => dispatch(updateEddiSuccess(id, settings)),
		updateEddiReadings : (id, readings) => dispatch(getEddiReadings(id, readings ))
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
		console.log('mounting...');

		const { updateMenuName, updateEddiSettings, updateEddiReadings, selectEddiById, eddi={}, location={} } = this.props;
		//if the id in the query changes, update the selected to that id
		if(location.query.id && location.query.id !== eddi.id) return selectEddiById(location.query.id);
		
		//if there is id, update the eddi's info
		if( eddi.settings ) updateMenuName(eddi.settings.name);
		if( eddi.readings ){
			//format the readings into an array for data handling
			const readings = mapDateToReadings(eddi.readings),
				current = readings[readings.length - 1];
			this.setState({ readings, current });
		}
		if(eddi.id){
			EddiFire.addEddiEventListener(eddi.id, 'settings', settings => updateEddiSettings(eddi.id, settings));
			EddiFire.addEddiEventListener(eddi.id, 'readings', readings => updateEddiReadings(eddi.id, readings));
		}
		
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, updateEddiReadings, updateEddiSettings, selectEddiById, eddi:oldEddi={}, location } = this.props,
			{ eddi } = newProps;
		//if the id in the query changes, update the selected to that id
		if(location.query.id && location.query.id !== eddi.id) return selectEddiById(location.query.id);

		//if there is id, update the eddi's info
		if(eddi.id && oldEddi.id !== eddi.id) {
			if( eddi.settings ) updateMenuName(eddi.settings.name);
			EddiFire.addEddiEventListener(eddi.id, 'settings', settings => updateEddiSettings(eddi.id, settings));
			EddiFire.addEddiEventListener(eddi.id, 'readings', readings => updateEddiReadings(eddi.id, readings));
		}

		if( eddi.readings ){
			//format the readings into an array for data handling
			const readings = mapDateToReadings(eddi.readings),
				current = readings[readings.length - 1];

			this.setState({ readings, current });
		}
	}

	componentWillUnmount(){
		const { eddi={} } = this.props;
		EddiFire.removeEddiEventListener(eddi.id, 'settings');
		EddiFire.removeEddiEventListener(eddi.id, 'readings');
	}

	_renderNoReadings(){
		return (
			<div className='readings-empty'>
				This eddi currently do not have any readings.
			</div>
		);
	}

	_renderSalinity(current, direction){
		const { readings } = this.state,
			{ eddi={} } = this.props,
			threshold = eddi.settings.salinity;


		return (
			<DashboardSalinity key={direction} 
				threshold={threshold}
				current={current}
				direction={direction}
				readings={readings}
			/>
		);
	}

	_renderFlow(rate){
		const { readings } = this.state;
		if(!readings.length) return this._renderNoReadings();
		return (
			<DashboardFlow rate={rate}
				readings={readings}
			/>
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
		const { current, readings } = this.state,
			{ eddi={}, location={} } = this.props,
			{ id, settings={} } = eddi,
			{ view } = location.query,
			{ salinityIn, salinityOut, flow, power } = getGoodBad(current, settings.salinity);

		let DashboardElement = readings.length ? this._renderViewBasedQuery(view) : this._renderNoReadings();
		return (
			<div id="dashboard" className="page">
				<DashboardMenu id={id} 
					view={view}
					salinityIn={salinityIn}
					salinityOut={salinityOut}
					flow={flow}
					power={power}
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
