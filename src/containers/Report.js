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
		const { updateMenuName } = this.props;
		updateMenuName('Report');
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
