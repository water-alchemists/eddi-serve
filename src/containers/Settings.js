'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	assignEddiThunk,
	setEddiStartThunk,
	setEddiEndThunk,
	setEddiSalinityThunk,
	getAllEddiByUserThunk,
} from '../actions/eddis';

import { modalShow } from '../actions/modal';

import SettingsEddi from '../components/SettingsEddi';

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
		getAllEddis : () => dispatch(getAllEddiByUserThunk()),
		openAddForm : () => dispatch(modalShow('AddEddiModal'))
	};
}

class Settings extends Component {
	componentWillMount(){
		const { getAllEddis } = this.props;
		getAllEddis();
	}

	clickAddHandler(){
		const { openAddForm } = this.props;
		openAddForm();
	}

	_renderEddis(){
		const { eddis } = this.props;
		return eddis.map(eddi => {
			return (
				<SettingsEddi eddi={eddi}/>
			)
		})
		console.log('these are the eddis', eddis);
	}

	render(){
		const EddiElements = this._renderEddis();
		return (
			<div>
				<div>
					{EddiElements}
				</div>
				<div style={styles.addButton} onClick={() => this.clickAddHandler()}>
					<p>add new</p>	
					<p>+</p>
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