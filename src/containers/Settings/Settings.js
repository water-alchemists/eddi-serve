'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	assignEddiThunk,
	setEddiStartThunk,
	setEddiEndThunk,
	setEddiSalinityThunk,
	setEddiZipThunk,
	getAllEddiByUserThunk,
	selectEddiById,
	updateEddiSuccess,
} from '../../actions/eddis';
import { menuNameChange } from '../../actions/menu';

import AddEddiButton from '../../components/AddEddiButton';
import SettingsEddi from '../../components/SettingsEddi';

import EddiFireStarter from '../../modules/eddi-firebase';
const EddiFire = EddiFireStarter();

import style from './Settings.less';

function mapStateToProps(state){
	return {
		// eddis : state.eddis.list,
		eddi : state.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		assignEddi : eddiId => dispatch(assignEddiThunk(eddiId)),
		updateStart : (eddiId, hour, minutes) => dispatch(setEddiStartThunk(eddiId, hour, minutes)),
		updateEnd : (eddiId, hour, minutes) => dispatch(setEddiEndThunk(eddiId, hour, minutes)),
		updateSalinity : (eddiId, salinity) => dispatch(setEddiSalinityThunk(eddiId, salinity)),
		updateZip : (eddiId, zip) => dispatch(setEddiZipThunk(eddiId, zip)),
		// getAllEddis : () => dispatch(getAllEddiByUserThunk()),
		updateMenuName: name => dispatch(menuNameChange(name)),
		selectEddiById: (eddi) => dispatch(selectEddiById(eddi)),
		updateEddiSettings : (id, settings) => dispatch(updateEddiSuccess(id, settings)),
	};
}

class Settings extends Component {
	componentWillMount(){
		// OLD
		// const { getAllEddis, updateMenuName } = this.props;
		// getAllEddis();
		// updateMenuName('Settings');

		// NEW
		const { updateMenuName, updateEddiSettings, selectEddiById, eddi={}, location={} } = this.props;
		//if the id in the query changes, update the selected to that id
		if(location.query.id && location.query.id !== eddi.id) return selectEddiById(location.query.id);
		
		//if there is id, update the eddi's info
		if( eddi.settings ) updateMenuName(eddi.settings.name);
		else updateMenuName('Settings');

		// if(eddi.id) EddiFire.addEddiEventListener(eddi.id, 'settings', settings => updateEddiSettings(eddi.id, settings));

	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, updateEddiSettings, selectEddiById, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps;
		//if there is id, update the eddi's info
		if(eddi.id && oldEddi.id !== eddi.id) {
			if( eddi.settings.name ) updateMenuName(eddi.settings.name);
			else updateMenuName('Settings');

			// EddiFire.addEddiEventListener(eddi.id, 'settings', settings => updateEddiSettings(eddi.id, settings));
		}
	}

	// componentWillUnmount(){
	// 	const { eddi={} } = this.props;
	// 	EddiFire.removeEddiEventListener(eddi.id, 'settings');
	// }

	_renderEddis(){
		const { eddis, updateSalinity, updateEnd, updateStart, updateZip } = this.props;
		return eddis.map(eddi => {
			const eddiId = eddi.id;
			return (
				<SettingsEddi key={eddiId}
					eddi={eddi}
					onSalinityChange={salinity => updateSalinity(eddiId, salinity)}
					onStartChange={(hour, minutes) => updateStart(eddiId, hour, minutes)}
					onEndChange={(hour, minutes) => updateEnd(eddiId, hour, minutes)}
					onZipChange={zip => updateZip(eddiId, zip)}
				/>
			)
		})
	}

	_renderSettings(){
		const { eddi={}, updateSalinity, updateEnd, updateStart, updateZip } = this.props;
		const eddiId = eddi.id;
		if(!eddiId) return null;
		return (
			<SettingsEddi key={eddiId}
				eddi={eddi}
				onSalinityChange={salinity => updateSalinity(eddiId, salinity)}
				onStartChange={(hour, minutes) => updateStart(eddiId, hour, minutes)}
				onEndChange={(hour, minutes) => updateEnd(eddiId, hour, minutes)}
				onZipChange={zip => updateZip(eddiId, zip)}
			/>
		);
	}

	render(){
		// const EddiElements = this._renderEddis();
		const EddiElements = this._renderSettings();

		return (
			<div id="settings" className="page">
				<div>
					{EddiElements}
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
