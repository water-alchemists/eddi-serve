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
} from '../../actions/eddis';
import { menuNameChange } from '../../actions/menu';

import AddEddiButton from '../../components/AddEddiButton';

import SettingsEddi from '../../components/SettingsEddi';

import style from './Settings.less';

function mapStateToProps(state){
	return {
		eddis : state.eddis.list,
	};
}

function mapDispatchToProps(dispatch){
	return {
		assignEddi : eddiId => dispatch(assignEddiThunk(eddiId)),
		updateStart : (eddiId, hour, minutes) => dispatch(setEddiStartThunk(eddiId, hour, minutes)),
		updateEnd : (eddiId, hour, minutes) => dispatch(setEddiEndThunk(eddiId, hour, minutes)),
		updateSalinity : (eddiId, salinity) => dispatch(setEddiSalinityThunk(eddiId, salinity)),
		updateZip : (eddiId, zip) => dispatch(setEddiZipThunk(eddiId, zip)),
		getAllEddis : () => dispatch(getAllEddiByUserThunk()),
		updateMenuName: name => dispatch(menuNameChange(name)),
	};
}

class Settings extends Component {
	componentWillMount(){
		const { getAllEddis, updateMenuName } = this.props;
		getAllEddis();
		updateMenuName('Settings');

	}

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

	render(){
		const EddiElements = this._renderEddis();
		return (
			<div id="settings" className="page">
				<div>
					{EddiElements}
				</div>
			</div>
		);
	}
}

const styles = {
	addButton : {
		display : 'flex',
		flexDirection : 'row',
		justifyContent : 'space-between',
		alignItems : 'center'
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
