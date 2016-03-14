'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../../actions/menu';
import { selectEddiById } from '../../actions/eddis';

import SalinityGraph from '../../components/graphs/SalinityGraph';


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

class Dashboard extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName } = this.props,
			{ eddi } = newProps;

		if( eddi ){
			updateMenuName(eddi.settings.name);
		}
	}

	render(){
		const { eddi } = this.props;
		return (
			<div id="dashboard" className="page">
				{'This is the dashboard page.'}
				<SalinityGraph salinity={2000} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
