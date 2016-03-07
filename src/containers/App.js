'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';

import { userLogout } from '../actions/user';

function mapStateToProps(state){
	return {
		user : state.user,
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		logout : () => dispatch(userLogout())
	}
}

class App extends Component {
	render(){
		const { logout, children } = this.props;
		return (
			<div>
				<Menu isOpen={true}
					logout={logout}
				/>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);