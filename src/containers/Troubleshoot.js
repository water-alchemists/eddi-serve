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
			<div className='page'>
				<p> Currently you are not tracking any eddis. </p>
				<AddEddiButton />
			</div>
		);
	}

	_renderNotSelected(){
		return (
			<div className='page'>
				<p> Select an eddi to track. </p>
			</div>
		);
	}

	_renderSelected(){
		const { eddi, setEddiState } = this.props,
			{ state, id } = eddi;
		return (
			<div className='page'>
				<EddiStateButton value={state}
					onClick={state => setEddiState(eddi.id, state)}
				/>
			</div>
		);
	}
	render(){
		const { eddi, eddiList, setEddiState } = this.props,
			hasEddis = !!eddiList.length;
		console.log(hasEddis, eddi, setEddiState);
		if(eddi) return this._renderSelected();
		else if(!hasEddis) return this._renderNoEddis();
		else return this._renderNotSelected();
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Troubleshoot);
