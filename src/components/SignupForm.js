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

	onUsernameChange(event){
		const username = event.target.value;
		this.setState({ username })
	}

	onPasswordChange(event){
		const password = event.target.value;
		this.setState({ password });
	}

	onNameChange(event){
		const name = event.target.value;
		console.log('this is the name', name);
		this.setState({ name });
	}

	submitHandler(event){
		const { onSubmit } = this.props,
			user = this.state;
		event.preventDefault();
		if(onSubmit) onSubmit(user);
	}

	render(){
		const { username, password, name } = this.state;
		return (
			<form onSubmit={event => this.submitHandler(event)}>
				<div>
					<div>
						<label htmlFor='username'>Username</label>
						<input 
							onChange={event => this.onUsernameChange(event)}
							name='username' 
							type='text'
							value={username}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input 
							onChange={event => this.onPasswordChange(event)}
							name='password'
							type='password'
							value={password}
						/>
					</div>
					<div>
						<label htmlFor='name'>Name</label>
						<input
							onChange={event => this.onNameChange(event)}
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