'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	assignEddiThunk,
	setEddiStartThunk,
	setEddiEndThunk,
	setEddiSalinityThunk
} from '../actions/eddis';

import { modalShow } from '../actions/modal';

import AddEddiForm from '../components/AddEddiForm';

function mapStateToProps(state){
	return {
		eddi : state.eddis.list
	};
}

function mapDispatchToProps(dispatch){
	return {
		assignEddi : eddiId => dispatch(assignEddiThunk(eddiId)),
		updateStart : (eddiId, hour, minutes) => dispatch(setEddiStartThunk(eddiId, hour, minutes)),
		updateEnd : (eddiId, hour, minutes) => dispatch(setEddiEndThunk(eddiId, hour, minutes)),
		updateSalinity : (eddiId, salinity) => dispatch(setEddiSalinityThunk(eddiId, salinity)),
		openAddForm : () => dispatch(modalShow('AddEddiForm'))
	};
}

class Settings extends Component {
	clickAddHandler(){
		const { openAddForm } = this.props;
		console.log('this ')
		openAddForm();
	}

	render(){
		const { eddi } = this.props;
		return (
			<div>
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