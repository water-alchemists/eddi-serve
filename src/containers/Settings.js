'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {
		eddi : state.eddis.list
	};
}

function mapDispatchToProps(dispatch){
	return {
		addEddi : eddiId => dispatch(),
		updateStart : time => dispatch(),
		updateEnd : time => dispatch(),
		updateSalinity : salinity => dispatch()
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