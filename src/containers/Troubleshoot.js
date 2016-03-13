'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setEddiStateThunk } from '../actions/eddis';

import EddiStateButton from '../components/EddiStateButton';
import AddEddiButton from '../components/AddEddiButton';

function mapStateToProps(state){
	return {
		eddiList : state.eddis.list,
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		setEddiState : (eddiId, state) => dispatch(setEddiStateThunk(eddiId, state))
	};
}

class Troubleshoot extends Component {
	_renderNoEddis(){
		return (
			<div className='eddis-empty'>
				<p> Currently you are not tracking any eddis. </p>
				<AddEddiButton />
			</div>
		);
	}

	_renderNotSelected(){
		return (
			<p> Select an eddi to track. </p>
		);
	}

	_renderSelected(){
		const { eddi, setEddiState } = this.props,
			{ settings={} , id } = eddi,
			{ state } = settings;

		return (
			<EddiStateButton value={!!state}
				onClick={state => setEddiState(eddi.id, state)}
			/>
		);
	}
	render(){
		const { eddi, eddiList, setEddiState } = this.props,
			hasEddis = !!eddiList.length;

		let TroubleshootElement;

		if(eddi) TroubleshootElement = this._renderSelected();
		else if(!hasEddis) TroubleshootElement = this._renderNoEddis();
		else TroubleshootElement = this._renderNotSelected();
		
		return (
			<div className='page'>
				{TroubleshootElement}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Troubleshoot);
