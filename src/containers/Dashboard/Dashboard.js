'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../../actions/menu';
import { selectEddiById } from '../../actions/eddis';

import SalinityGraph from '../../components/graphs/SalinityGraph';
import DashboardMenu from '../../components/DashboardMenu';

import style from './Dashboard.less';

function mapStateToProps(state){
	return {
		eddi : state.eddis.selected
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
			readings : []
		};
	}

	componentWillMount(){
		const { updateMenuName, eddi={} } = this.props;
		if( eddi.id ) {
			updateMenuName(eddi.settings.name);
			if(eddi.readings){
				//format the readings into an array for data handling
				const readings = mapDateToReadings(eddi.readings);
				console.log('these are the readings', readings);
				this.setState({ readings });
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
				const readings = mapDateToReadings(eddi.readings);
				console.log('these are the readings', readings);
				this.setState({ readings });
			}
		}
	}

	_renderSalinityOut(){
		const { eddi={} } = this.props;
	}

	render(){
		const { eddi={} } = this.props,
			{ id } = eddi;
		return (
			<div id="dashboard" className="page">
				<DashboardMenu id={id} />
				<SalinityGraph salinity={2000} />

			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
