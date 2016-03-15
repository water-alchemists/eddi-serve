'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../actions/menu';

function mapStateToProps(state){
	return {
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		updateMenuName: name => dispatch(menuNameChange(name)),
	};
}

class Report extends Component {
	componentWillMount(){
		const { updateMenuName, eddi={} } = this.props;
		if( eddi.id ) updateMenuName(eddi.settings.name);
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps;

		if( eddi.id !== oldEddi.id ) updateMenuName(eddi.settings.name);
	}

	render(){
		const { eddi } = this.props;
		return (
			<div id="report" className='page'>
				{'This is the report page.'}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
