'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLoginWithPasswordThunk } from '../actions/user';

import LoginForm from '../components/LoginForm';

function mapStateToProps(state){
	return {
		user : state.user
	};
}

function mapDispatchToProps(dispatch){
	return {
		login : ({ email, password }) => dispatch(userLoginWithPasswordThunk(email, password))
	};
}

class Login extends Component {
	render(){
		const { login, user } = this.props;
		return (
			<div>
				<LoginForm onSubmit={login} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);