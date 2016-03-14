'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setEddiStateThunk } from '../actions/eddis';
import { menuNameChange } from '../actions/menu';

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
		setEddiState : (eddiId, state) => dispatch(setEddiStateThunk(eddiId, state)),
		updateMenuName: name => dispatch(menuNameChange(name)),
	};
}

class Troubleshoot extends Component {
	componentWillMount(){
		const { updateMenuName } = this.props;
		updateMenuName('Troubleshoot');
	}

	_renderNoEddis(){
		return (
			<div className='eddis-empty'>
				<p> Currently you are not tracking any eddis. </p>
				<AddEddiButton />
			</div>
		);
	}

	_renderSelected(){
		const { eddi={} , setEddiState } = this.props,
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

		if(!hasEddis) TroubleshootElement = this._renderNoEddis();
		else TroubleshootElement = this._renderSelected();
		
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
