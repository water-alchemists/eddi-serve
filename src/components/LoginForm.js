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

	onUsernameChange(username){
		this.setState({ username });
	}

	onPasswordChange(password){
		this.setState({ password });
	}

	submitHandler(){
		const { onSubmit } = this.props,
			user = this.state;
		if(onSubmit) onSubmit(user);
	}

	render(){
		const { username, password } = this.state
		return (
			<form onSubmit={() => this.submitHandler()}>
				<div>
					<div>
						<label>Username</label>
						<input onChange={text => this.onUsernameChange(text)}
							type='text'
							value={username}
						/>
					</div>
					<div>
						<label>Password</label>
						<input onChange={text => this.onPasswordChange(text)} 
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