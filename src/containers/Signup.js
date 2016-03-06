'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreateThunk } from '../actions/user';

import SignupForm from '../components/SignupForm';

function mapStateToProps(state){
	return {
		user : state.user
	};
}

function mapDispatchToProps(dispatch){
	return {
		signup : user => dispatch(userCreateThunk(user))
	};
}

class Signup extends Component {
	render(){
		const { signup, user } = this.props;

		return (
			<div>
				<SignupForm onSubmit={signup} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);