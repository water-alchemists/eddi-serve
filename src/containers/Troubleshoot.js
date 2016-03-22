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
		const { updateMenuName, eddi={} } = this.props;
		if( eddi.id ) updateMenuName(eddi.settings.name);
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps;

		if( eddi.id !== oldEddi.id ) updateMenuName(eddi.settings.name);
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
			<div>
				<img src='/assets/troubleshoot.svg' width='100'></img>
				<EddiStateButton value={!!state}
					onClick={state => setEddiState(eddi.id, state)}
				/>
			</div>
		);
	}
	render(){
		const { eddi, eddiList, setEddiState } = this.props,
			hasEddis = !!eddiList.length;

		let TroubleshootElement;

		if(!hasEddis) TroubleshootElement = this._renderNoEddis();
		else TroubleshootElement = this._renderSelected();
		
		return (
			<div id='troubleshoot' className='page'>
				{TroubleshootElement}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Troubleshoot);
