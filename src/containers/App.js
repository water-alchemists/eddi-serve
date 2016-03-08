'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';

import { userLogout, userLoginWithTokenThunk } from '../actions/user';

function mapStateToProps(state){
	return {
		user : state.user,
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		loginWithToken : () => dispatch(userLoginWithTokenThunk()),
		logout : () => dispatch(userLogout())
	}
}

class App extends Component {
	componentWillMount(){
		const { loginWithToken } = this.props;
		loginWithToken();
	}

	render(){
		const { user, eddi, logout, children } = this.props;
		return (
			<div>
				<Menu isOpen={true}
					logout={logout}
					user={user}
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