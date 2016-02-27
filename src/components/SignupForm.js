'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class SignupForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : '',
			password : '',
			name : ''
		};
	}

	onUsernameChange(username){
		this.setState({ username })
	}

	onPasswordChange(password){
		this.setState({ password });
	}

	onNameChange(name){
		this.setState({ name });
	}

	submitHandler(){
		const { onSubmit } = this.props,
			user = this.state;

		if(onSubmit) onSubmit(user);
	}

	render(){
		const { username, password, name } = this.state;
		return (
			<form onSubmit={() => this.submitHandler()}>
				<div>
					<div>
						<label htmlFor='username'>Username</label>
						<input 
							onChange={text => this.onUsernameChange(text)}
							name='username' 
							type='text'
							value={username}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input 
							onChange={text => this.onPasswordChange(text)}
							name='password'
							type='password'
							value={password}
						/>
					</div>
					<div>
						<label htmlFor='name'>Name</label>
						<input
							onChange={text => this.onNameChange(text)}
							name='name'
							type='text'
							value={name}
						/>
					</div>
					<button type='submit'>Signup</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	onSubmit : PropTypes.func
};

export default SignupForm;