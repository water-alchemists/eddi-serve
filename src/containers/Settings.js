'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	assignEddiThunk,
	setEddiStartThunk,
	setEddiEndThunk,
	setEddiSalinityThunk
} from '../actions/eddis';

function mapStateToProps(state){
	return {
		eddi : state.eddis.list
	};
}

function mapDispatchToProps(dispatch){
	return {
		assignEddi : eddiId => dispatch(assignEddiThunk(eddiId)),
		updateStart : (eddiId, hour, minutes) => dispatch(setEddiStartThunk(eddiId, hour, minutes)),
		updateEnd : (eddiId, hour, minutes) => dispatch(setEddiEndThunk(eddiId, hour, minutes)),
		updateSalinity : (eddiId, salinity) => dispatch(setEddiSalinityThunk(eddiId, salinity))
	};
}

class Settings extends Component {
	render(){
		const { eddi } = this.props;
		return (
			<div>
				
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);