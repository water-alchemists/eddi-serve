'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';

import { setEddiStateThunk, getEddiCycleSuccess } from '../../actions/eddis';
import { menuNameChange } from '../../actions/menu';

import EddiStateButton from '../../components/EddiStateButton';
import AddEddiButton from '../../components/AddEddiButton';

import EddiFireStarter from '../../modules/eddi-firebase';

import style from './Troubleshoot.less';

const EddiFire = EddiFireStarter();

function mapStateToProps(state){
	return {
		eddiList : state.eddis.list,
		eddi : state.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		setEddiState : (eddiId, state) => dispatch(setEddiStateThunk(eddiId, state)),
		updateMenuName: name => dispatch(menuNameChange(name)),
		getEddiCycle : (eddiId, cycle) => dispatch(getEddiCycleSuccess(eddiId, cycle))
	};
}

class Troubleshoot extends Component {
	componentWillMount(){
		const { updateMenuName, getEddiCycle, eddi={} } = this.props;
		if( eddi.id ) {
			updateMenuName(eddi.settings.name);
			EddiFire.addEddiEventListener(eddi.id, 'state', cycle => getEddiCycle(eddi.id, cycle));
		}
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, getEddiCycle, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps;

		if( eddi.id && eddi.id !== oldEddi.id ) {
			updateMenuName(eddi.settings.name);
			EddiFire.addEddiEventListener(eddi.id, 'state', cycle => getEddiCycle(eddi.id, cycle));
		}
	}

	componentWillUnmount(){
		const { eddi={} } = this.props;
		if(eddi.id) EddiFire.removeEddiEventListener(eddi.id, 'state');
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
			{ state={} , id } = eddi,
			cycles = ['off', 'prime', 'channel a', 'channel b'];

		return (
			<div className='content'>
				<div className='image-container'>
					<img src='/assets/troubleshoot.svg' height='200'></img>
				</div>
				<div className='cycle-list'>
					{ 
						cycles.map( (cycle, index) => {
							const cycleClassName = className(['cycle', { active : index === state.state }]);
							return (
								<div key={cycle} className={ cycleClassName }>
									<div>{`${index + 1}. `}</div>
									<div>{cycle.toUpperCase()}</div>
								</div>
								);
						} )
					}
				</div>
				<div className='footer'>
					<EddiStateButton value={!!state}
						onClick={state => setEddiState(eddi.id, state)}
					/>
				</div>
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
