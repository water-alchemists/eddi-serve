'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {
		eddi : state.eddis.eddi
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

class Dashboard extends Component {
	render(){
		const { eddi } = this.props;
		return (
			<div>
				{'This is the dashboard page.'}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);