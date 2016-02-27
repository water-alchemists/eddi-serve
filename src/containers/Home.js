'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, userLogout } from '../actions/user';

function mapStateToProps(state){
	return {
		user : state.user
	};
}

function mapDispatchToProps(dispatch){
	return {
		login : user => dispatch(userLogin(value)),
		logout : () => dispatch(userLogout())
	};
}

class Home extends Component {
	render(){
		const { user } = this.props;
		return (
			<div>
				Some state changes:
				{JSON.stringify(user)}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);