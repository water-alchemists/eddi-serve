'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

class Troubleshoot extends Component {
	render(){
		const { eddi } = this.props;
		return (
			<div>
				{'This is the troubleshoot page.'}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Troubleshoot);