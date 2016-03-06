'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : '',
			password : ''
		};
	}

	onUsernameChange(event){
		const username = event.target.value;
		this.setState({ username });
	}

	onPasswordChange(event){
		const password = event.target.value;
		this.setState({ password });
	}

	submitHandler(event){
		const { onSubmit } = this.props,
			user = this.state;

		event.preventDefault();
		if(onSubmit) onSubmit(user);
	}

	render(){
		const { username, password } = this.state
		return (
			<form onSubmit={event => this.submitHandler(event)}>
				<div>
					<div>
						<label>Username</label>
						<input onChange={event => this.onUsernameChange(event)}
							type='text'
							value={username}
						/>
					</div>
					<div>
						<label>Password</label>
						<input onChange={event => this.onPasswordChange(event)} 
							type='text' 
							value={password}
						/>
					</div>
					<button type='submit'>Login</button>
				</div>
			</form>
		);
	}
}

LoginForm.propTypes = {
	onSubmit : PropTypes.func
};

export default LoginForm;